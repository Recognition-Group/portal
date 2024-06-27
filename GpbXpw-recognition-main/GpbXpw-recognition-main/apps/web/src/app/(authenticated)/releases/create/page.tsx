'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Form,
  Input,
  DatePicker,
  Button,
  Upload,
  Row,
  Col,
  Select,
  List,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ReleaseCreationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [rightsHolder, setRightsHolder] = useState<Model.RightsHolder | null>(
    null,
  )
  const [fileList, setFileList] = useState<any[]>([])
  const [tracks, setTracks] = useState<Model.Track[]>([])
  const [selectedTracks, setSelectedTracks] = useState<Model.Track[]>([])

  useEffect(() => {
    if (userId) {
      Api.RightsHolder.findManyByUserId(userId, {
        includes: ['user', 'releases'],
      })
        .then(rightsHolders => {
          if (rightsHolders.length > 0) {
            setRightsHolder(rightsHolders[0])
          }
        })
        .catch(() => {
          enqueueSnackbar('Failed to load rights holder data', {
            variant: 'error',
          })
        })

      Api.Track.findMany({
        filters: { rightsHolderId: { eq: userId } },
      })
        .then(tracks => {
          setTracks(tracks)
        })
        .catch(() => {
          enqueueSnackbar('Failed to load tracks', {
            variant: 'error',
          })
        })
    }
  }, [userId])

  const handleUpload = async (options: any) => {
    const { file } = options
    try {
      const url = await Api.Upload.upload(file)
      setFileList([{ url, status: 'done' }])
    } catch (error) {
      enqueueSnackbar('Failed to upload album cover', { variant: 'error' })
    }
  }

  const onTrackSelectChange = (selectedTrackIds: string[]) => {
    const selectedTracks = tracks.filter(track => selectedTrackIds.includes(track.id))
    setSelectedTracks(selectedTracks)
  }

  const onFinish = async (values: any) => {
    if (rightsHolder) {
      const releaseData: Partial<Model.Release> = {
        albumCoverUrl: fileList[0]?.url,
        releaseDate: values.releaseDate
          ? dayjs(values.releaseDate).format('YYYY-MM-DD')
          : undefined,
        uPceancode: values.upcEanCode,
        status: 'pending',
      }

      try {
        const release = await Api.Release.createOneByRightsHolderId(
          rightsHolder.id,
          releaseData,
        )

        const releaseTracksData = selectedTracks.map((track, index) => ({
          trackId: track.id,
          releaseId: release.id,
          albumPosition: index + 1,
        }))

        await Promise.all(
          releaseTracksData.map(data => Api.ReleaseTrack.createOneByTrackId(data.trackId, data))
        )

        enqueueSnackbar('Release created successfully', { variant: 'success' })
        router.push('/home')
      } catch (error) {
        enqueueSnackbar('Failed to create release', { variant: 'error' })
      }
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Title level={2}>Create a New Release</Title>
          <Text>
            Upload your album cover and provide the release date and UPC/EAN
            code to prepare your music for distribution.
          </Text>
          <Form
            layout="vertical"
            onFinish={onFinish}
            style={{ marginTop: '20px' }}
          >
            <Form.Item
              name="albumCover"
              label="Album Cover (3000px by 3000px .jpeg)"
              valuePropName="fileList"
              getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)}
              rules={[
                { required: true, message: 'Please upload the album cover' },
              ]}
            >
              <Upload
                fileList={fileList}
                customRequest={handleUpload}
                maxCount={1}
                accept=".jpeg"
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="releaseDate"
              label="Release Date"
              rules={[
                { required: true, message: 'Please select the release date' },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="upcEanCode"
              label="UPC/EAN Code"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!rightsHolder?.releases?.length || value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Please enter the UPC/EAN code'))
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="tracks"
              label="Select and Order Tracks"
              rules={[
                { required: true, message: 'Please select at least one track' },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select tracks"
                onChange={onTrackSelectChange}
                options={tracks.map(track => ({
                  label: track.title,
                  value: track.id,
                }))}
              />
            </Form.Item>
            <List
              bordered
              dataSource={selectedTracks}
              renderItem={track => (
                <List.Item key={track.id}>
                  {track.title}
                </List.Item>
              )}
            />
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit for Approval
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}

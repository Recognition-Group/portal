'use client'

import { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Upload,
  DatePicker,
  Row,
  Col,
  Typography,
  Select,
  Checkbox,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TrackUploadPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [fileList, setFileList] = useState([])

  const handleUpload = async options => {
    const { file } = options
    const url = await Api.Upload.upload(file)
    setFileList(fileList => [...fileList, { url: url, status: 'done' }])
  }

  const onFinish = async values => {
    const rightsHolderId = params.rightsHolderId // Assuming rightsHolderId is passed in params
    const trackData = {
      title: values.title,
      isrc: values.isrc,
      recordingYear: values.recordingYear.year(),
      mainRecordingSessionCountry: values.recordingLocation,
      rightsHolderId: rightsHolderId,
      displayTitle: values.displayTitle,
      mainArtists: values.mainArtists,
      creationDate: values.creationDate,
      explicitLyrics: values.explicitLyrics,
      albumPosition: values.albumPosition,
      albumVolume: values.albumVolume,
      instrumental: values.instrumental,
      lyrics: values.lyrics,
      mainGenre: values.mainGenre,
      mainSubgenre: values.mainSubgenre,
      originalTitle: values.originalTitle,
      originalTitleLanguage: values.originalTitleLanguage,
      recordingFirstOwnerCountry: values.recordingFirstOwnerCountry,
      recordingOwnership: values.recordingOwnership,
      recordingType: values.recordingType,
      authors: values.authors,
      featuredArtists: values.featuredArtists,
      composers: values.composers,
      recordLabels: values.recordLabels,
      musicPublishers: values.musicPublishers,
      ...(fileList.length > 0 && { audioFileUrl: fileList[0].url }),
    }

    try {
      await Api.Track.createOneByRightsHolderId(rightsHolderId, trackData)
      enqueueSnackbar('Track uploaded successfully!', { variant: 'success' })
      router.push('/home')
    } catch (error) {
      enqueueSnackbar('Failed to upload track. Please try again.', {
        variant: 'error',
      })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col xs={24} md={12}>
          <Title level={2}>Upload Track</Title>
          <Text>
            Fill in the track information and upload the file to add it to your
            catalog.
          </Text>
          <Form
            layout="vertical"
            onFinish={onFinish}
            style={{ marginTop: '20px' }}
          >
            <Form.Item
              label="Track Title"
              name="title"
              rules={[
                { required: true, message: 'Please input the track title!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Display Title"
              name="displayTitle"
              rules={[
                { required: true, message: 'Please input the display title!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Main Artists"
              name="mainArtists"
              rules={[
                { required: true, message: 'Please input the main artists!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Creation Date"
              name="creationDate"
              rules={[
                { required: true, message: 'Please select the creation date!' },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Explicit Lyrics"
              name="explicitLyrics"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
            <Form.Item
              label="Album Position"
              name="albumPosition"
              rules={[
                { required: true, message: 'Please input the album position!' },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Album Volume"
              name="albumVolume"
              rules={[
                { required: true, message: 'Please input the album volume!' },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Instrumental"
              name="instrumental"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
            <Form.Item
              label="Lyrics"
              name="lyrics"
              rules={[
                { required: true, message: 'Please input the lyrics!' },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Main Genre"
              name="mainGenre"
              rules={[
                { required: true, message: 'Please input the main genre!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Main Subgenre"
              name="mainSubgenre"
              rules={[
                { required: true, message: 'Please input the main subgenre!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Original Title"
              name="originalTitle"
              rules={[
                { required: true, message: 'Please input the original title!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Original Title Language"
              name="originalTitleLanguage"
              rules={[
                {
                  required: true,
                  message: 'Please input the original title language!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Recording First Owner Country"
              name="recordingFirstOwnerCountry"
              rules={[
                {
                  required: true,
                  message: 'Please input the recording first owner country!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Recording Ownership"
              name="recordingOwnership"
              rules={[
                {
                  required: true,
                  message: 'Please input the recording ownership!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Recording Type"
              name="recordingType"
              rules={[
                { required: true, message: 'Please input the recording type!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Recording Year"
              name="recordingYear"
              rules={[
                {
                  required: true,
                  message: 'Please select the recording year!',
                },
              ]}
            >
              <DatePicker picker="year" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Authors"
              name="authors"
              rules={[
                { required: true, message: 'Please input the authors!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Featured Artists"
              name="featuredArtists"
              rules={[
                {
                  required: true,
                  message: 'Please input the featured artists!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Composers"
              name="composers"
              rules={[
                { required: true, message: 'Please input the composers!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Record Labels"
              name="recordLabels"
              rules={[
                { required: true, message: 'Please input the record labels!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Music Publishers"
              name="musicPublishers"
              rules={[
                { required: true, message: 'Please input the music publishers!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Upload Track"
              name="upload"
              rules={[{ required: true, message: 'Please upload the track!' }]}
            >
              <Upload
                fileList={fileList}
                customRequest={handleUpload}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Typography, Form, Input, Button, Select, Spin, Row, Col } from 'antd'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AdminPortalPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [release, setRelease] = useState<Model.Release | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [form] = Form.useForm()

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminData = await Api.Admin.findOne(userId as string)
        if (!adminData) {
          router.push('/home')
          return
        }
        const fetchRelease = async () => {
          try {
            const releaseId = params.id
            const releaseData = await Api.Release.findOne(releaseId, {
              includes: ['rightsHolder'],
            })
            setRelease(releaseData)
            form.setFieldsValue(releaseData)
          } catch (error) {
            enqueueSnackbar('Failed to fetch release data', { variant: 'error' })
          } finally {
            setLoading(false)
          }
        }
        fetchRelease()
      } catch (error) {
        enqueueSnackbar('Failed to verify admin status', { variant: 'error' })
        router.push('/home')
      }
    }
    checkAdminStatus()
  }, [params.id, form, userId, router, enqueueSnackbar])

  const handleUpdateRelease = async (values: Partial<Model.Release>) => {
    try {
      setLoading(true)
      const updatedRelease = await Api.Release.updateOne(
        release?.id as string,
        values,
      )
      setRelease(updatedRelease)
      enqueueSnackbar('Release updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update release', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <PageLayout layout="full-width">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col span={24} style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Title level={2}>Edit Release</Title>
          <Text>Edit the details of the release and update its status.</Text>
        </Col>
        <Col span={24} style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateRelease}
            initialValues={release}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input prefix={<EditOutlined />} placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select the status!' }]}
            >
              <Select placeholder="Select a status">
                <Option value="draft">Draft</Option>
                <Option value="submitted">Submitted</Option>
                <Option value="approved">Approved</Option>
                <Option value="rejected">Rejected</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}

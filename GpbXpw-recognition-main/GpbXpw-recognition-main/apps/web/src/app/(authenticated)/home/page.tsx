'use client'

import { useEffect, useState } from 'react'
import { Typography, Progress, Row, Col, Card } from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const statusIcons = {
  submitted: <SyncOutlined spin />,
  'QC by Recognition': <ClockCircleOutlined />,
  processing: <SyncOutlined spin />,
  'ingesting to DSPs': <SyncOutlined spin />,
  delivered: <CheckCircleOutlined />,
  'audio rejected': <CloseCircleOutlined />,
  released: <CheckCircleOutlined />,
  'taken down': <CloseCircleOutlined />,
}
const statusSteps = [
  'submitted',
  'QC by Recognition',
  'processing',
  'ingesting to DSPs',
  'delivered',
  'audio rejected',
  'released',
  'taken down',
]
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [releaseStatus, setReleaseStatus] = useState<string>('')

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: ['rightsHolders', 'rightsHolders.releases'],
      })
        .then(user => {
          const rightsHolder = user.rightsHolders?.[0]
          const release = rightsHolder?.releases?.[0]
          if (release) {
            setReleaseStatus(release.status || '')
          }
        })
        .catch(error => {
          enqueueSnackbar('Failed to fetch release status', {
            variant: 'error',
          })
        })
    }
  }, [userId])

  const currentStepIndex = statusSteps.indexOf(releaseStatus)
  const progressPercent = ((currentStepIndex + 1) / statusSteps.length) * 100

  return (
    <PageLayout layout="full-width">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Card>
            <Title level={2}>Release Status</Title>
            <Text>Track the status of your submission</Text>
            <Progress percent={progressPercent} status="active" />
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
              {statusSteps.map((status, index) => (
                <Col span={8} key={status}>
                  <Card
                    title={status}
                    bordered={false}
                    style={{
                      textAlign: 'center',
                      backgroundColor:
                        index <= currentStepIndex ? '#f0f0f0' : '#fff',
                    }}
                  >
                    {statusIcons[status]}
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}

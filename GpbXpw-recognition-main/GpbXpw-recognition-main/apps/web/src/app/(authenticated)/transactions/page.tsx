'use client'

import { useEffect, useState } from 'react';
import { Table, Button, Spin, message } from 'antd';
import { useAuthentication } from '@web/modules/authentication';
import { Api, Model } from '@web/domain';
import { DownloadOutlined } from '@ant-design/icons';

export default function Transactions() {
  const [statements, setStatements] = useState<Model.BillingPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authentication = useAuthentication();

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        if (authentication.user?.id) {
          const statements = await Api.Billing.findManyPayments();
          setStatements(statements);
        }
      } catch (err) {
        setError('Failed to fetch statements');
      } finally {
        setLoading(false);
      }
    };

    fetchStatements();
  }, [authentication.user?.id]);

  const handleDownload = async (statementId: string) => {
    try {
      const fileUrl = await Api.Billing.createPaymentLink(statementId);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `statement-${statementId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      message.error('Failed to download statement');
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Model.BillingPayment) => (
        <Button
          icon={<DownloadOutlined />}
          onClick={() => handleDownload(record.id)} // Updated to use the correct property
        >
          Download
        </Button>
      ),
    },
  ];

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Table dataSource={statements} columns={columns} rowKey="id" /> {/* Updated to use the correct property */}
    </div>
  );
}

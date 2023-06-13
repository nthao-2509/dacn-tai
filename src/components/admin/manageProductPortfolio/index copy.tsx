import Header from 'common/admin/Header'
import React from 'react'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Image, Input, Modal, Row, Select, Table, Upload, message } from 'antd'
import { postQueryHelper } from 'helpers/queryHelper'

const ProductPortfolio = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [disableButtonSubmit, setDisableButtonSubmit] = React.useState<boolean>(false)
  const [formAddProduct] = Form.useForm()
  const onFinish = async (values: any) => {
    setDisableButtonSubmit(true)
    const response = await postQueryHelper('/post-product-portfolio', {
      name: values.name,
    })
    setIsModalOpen(false)
    if (response === 'success') {
      setDisableButtonSubmit(false)

      message.success('Thêm danh mục thành công')
    } else {
      setDisableButtonSubmit(false)
      message.error('Thêm danh mục thất bại')
    }
  }

  return (
    <>
      <Header title='DANH MỤC SẢN PHẨM'>
        <Button type='primary' icon={<PlusCircleOutlined />} onClick={() => setIsModalOpen(true)}>
          Thêm danh mục
        </Button>
      </Header>
      <Modal
        style={{
          height: '80vh',
        }}
        width={'30%'}
        title='DANH MỤC SẢN PHẨM'
        onOk={() => formAddProduct.submit()}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={disableButtonSubmit}
        open={isModalOpen}
      >
        <Form onFinish={onFinish} form={formAddProduct} layout='vertical'>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Form.Item label='Tên danh mục:' name='name' required>
                <Input placeholder='Tên danh mục' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default ProductPortfolio

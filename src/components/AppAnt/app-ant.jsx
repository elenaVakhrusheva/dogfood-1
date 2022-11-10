import React from 'react'; 
import s from './index.module.css';
import {Layout, Row, Col, Typography, Slider} from 'antd';
//import Layout from 'antd/lib/layout/layout';
import Table from '../Table/table.jsx';
/*
import styled from 'styled-components';

const TitleStyle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const Button = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;
*/
const {Header, Footer, Content} = Layout;
const { Title } = Typography;

function AppAnt() {

  
  return (
    <Layout>
      <Header className={s.header}>Header</Header>
      <Content>
        {/* <Button>Кнопка</Button>
        <Button primary>Primary</Button>
        <TomatoButton>TomatoButton</TomatoButton> 
        <TitleStyle>Заголовок</TitleStyle>*/}
        <Row>
          <Col  xs={24} sm={16} md={{span: 20, offset:4}} lg={20} xl={4} >
            <Slider min={1} max={50}  defaultValue={10} />

            <Title level={4}>Количество Покемонов</Title>
            <Table rows={10}/>
          </Col>
          
        </Row>
      </Content>
      
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default AppAnt;
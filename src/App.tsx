import './App.css';
import { Layout, Typography, Pagination } from 'antd';
import { BookFilled } from '@ant-design/icons';
import { useState } from 'react';
import { BookCard } from './components/BookCard';
import Input from 'antd/es/input';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

function App() {
  const [data, setData] = useState<any[]>();
  const [total, setTotal] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputData, setInputData] = useState('');

  const END_POINT = 'https://www.googleapis.com/books/v1';

  const searchBook = async(inputInfo: string) => {
    setInputData(inputInfo);
    setCurrentPage(1);
    await fetch(`${END_POINT}/volumes?q=${inputInfo}&maxResults=10&startIndex=0`).then(res => res.json()).then(data => {
      setTotal(data.totalItems);
      setData(data.items);
    });
  };

  const movePage = async(nextPage: number) => {
    const newIndex = (nextPage-1) * 10;
    setCurrentPage(nextPage);
    await fetch(`${END_POINT}/volumes?q=${inputData}&maxResults=10&startIndex=${newIndex}`).then(res => res.json()).then(data => {
      setData(data.items);
    });
    window.scrollTo(0,0);
  }

  return (
    <Layout>
      <Header style={{height: '160px'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <BookFilled style={{color: 'white', fontSize: '32px', marginRight: '8px', marginTop: '16px'}}/>
          <Title style={{color: 'white'}}>Book Research App</Title>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Search placeholder='ISBNを入力してください' onSearch={searchBook} style={{width: '400px'}}/>
        </div>
      </Header>
      <Content style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '24px', gap: '24px'}}>
        {Array.isArray(data) && data.map(book => {
          return <BookCard key={book.id} img={book.volumeInfo.imageLinks?.thumbnail} title={book.volumeInfo.title} description={book.volumeInfo.description}/>;
        })
        }
        {Array.isArray(data) && <Pagination current={currentPage} onChange={movePage} showSizeChanger={false} total={total}/>}
      </Content>
    </Layout>
  );
}

export default App;

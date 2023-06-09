import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Tag from '../../components/tag/Tag';
import SearchInput from '../../components/common/input/SearchInput';
import MainScrollPart from '../../components/main/MainScrollPart';
import bgImage from '../../assets/images/mainPage/bg-01.jpg';
import icSearch from '../../assets/icons/search-grey.svg';
import { theme } from '../../styles/Theme';

const MainPage = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/board/all?keyword=${searchKeyword}&sort=newest`);
  };

  return (
    <Wrapper>
      <SectionTop className='section-top'>
        <Copy>
          Ask. Share. Cook.
          <br />
          chatGPT에게 레시피를 묻고,
          <br />
          나만의 레시피를 공유해보세요
        </Copy>
        <CategoryWrapper>
          <ul className='section-top__categories categories'>
            <li className='category'>
              <button
                onClick={() =>
                  navigate('/board/all?keyword=&sort=newest', {
                    state: { category: '한식' },
                  })
                }
              >
                <Tag className='category-item'>전체</Tag>
              </button>
            </li>
            <li className='category'>
              <button
                onClick={() =>
                  navigate('/board/korean?keyword=&sort=newest', {
                    state: { category: '한식' },
                  })
                }
              >
                <Tag className='category-item'>한식</Tag>
              </button>
            </li>
            <li className='category'>
              <button
                onClick={() =>
                  navigate('/board/western?keyword=&sort=newest', {
                    state: { category: '양식' },
                  })
                }
              >
                <Tag className='category-item'>양식</Tag>
              </button>
            </li>
            <li className='category'>
              <button
                onClick={() =>
                  navigate('/board/japanese?keyword=&sort=newest', {
                    state: { category: '일식' },
                  })
                }
              >
                <Tag className='category-item'>일식</Tag>
              </button>
            </li>
            <li className='category'>
              <button
                onClick={() =>
                  navigate('/board/chinese?keyword=&sort=newest', {
                    state: { category: '중식' },
                  })
                }
              >
                <Tag className='category-item'>중식</Tag>
              </button>
            </li>
            <li className='category'>
              <button
                onClick={() =>
                  navigate('/board/etc?keyword=&sort=newest', {
                    state: { category: '기타' },
                  })
                }
              >
                <Tag className='category-item'>기타</Tag>
              </button>
            </li>
          </ul>
        </CategoryWrapper>
        <SearchWrapper onSubmit={searchHandler}>
          <SearchInput
            className='search'
            placeholder='레시피 검색하기..'
            alwaysVisible={true}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <div className='ic-search'>
            <img src={icSearch} alt='검색' />
          </div>
        </SearchWrapper>
      </SectionTop>
      <SectionMiddle>
        <MainScrollPart />
      </SectionMiddle>
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div``;
const SectionTop = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${bgImage});
  background-size: cover;
  padding: 13.2rem 5.2rem;
  display: flex;
  flex-direction: column;
`;
const Copy = styled.p`
  text-align: center;
  margin: 0 auto;
  font-size: 4.2rem;
  font-weight: bold;
  line-height: 5.6rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 6.4rem;
`;
const CategoryWrapper = styled.div`
  ul {
    width: fit-content;
    margin: 0 auto;
  }
  .category {
    display: inline-block;
    padding: 0 1.2rem;
    cursor: pointer;
  }
  .category-item {
    .tag-container {
      padding: 0.8rem 1.8rem;
      background: rgba(0, 0, 0, 0.75);
      .tag-name {
        font-size: 1.6rem;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.6);
        box-shadow: -0.2rem -0.2rem 0.4rem rgba(255, 255, 255, 0.2) inset;
      }
    }
    .tag-name {
      color: white;
      font-size: 2rem;
      font-weight: bold;
    }
  }
`;
const SearchWrapper = styled.div`
  position: relative;
  z-index: 0;
  margin: 0 auto;
  > .ic-search {
    position: absolute;
    top: 42%;
    left: 2.8rem;
  }
  .search {
    padding: 1.2rem;
    form {
      input {
        min-width: 57.6rem;
        border-radius: 3rem;
        padding: 1.6rem 1.6rem 1.6rem 5.8rem;
        ::placeholder {
          color: ${theme.colors.grey50};
        }
      }
      button {
        display: none;
      }
    }
  }
`;
const SectionMiddle = styled.section`
  /* height: 100rem; */
`;

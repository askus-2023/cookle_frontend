import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import CommentBox from '../../../components/comment/CommentBox';
import Tag from '../../../components/tag/Tag';
import defaultProfile from '../../../assets/images/default-profile.png';
import useScroll from '../../../hooks/useScroll';
import { getBoardDetail } from '../../../apis/board';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../../../recoil/auth/accessToken';
import Spinner from '../../../components/common/spinner/Spinner';
import { categoryMap } from '../../../infra/category';
import thumbnail from '../../../assets/images/thumbnail.png';

const BoardDetailPage = () => {
  const ref = useRef(null);
  const articleRef = useRef();
  const location = useLocation();
  const accessToken = useRecoilValue(accessTokenState);
  const { boardId } = useParams();

  const { data, isLoading, isSuccess } = useQuery(
    [`boards/${boardId}`],
    () =>
      getBoardDetail({
        id: boardId,
        accessToken,
      }),
    {
      staleTime: 30,
    }
  );

  const tags = useMemo(
    () => isSuccess && data?.tag.split(','),
    [isSuccess, data]
  );

  const updateImageUrl = useCallback(() => {
    if (isSuccess) {
      const article = articleRef.current;
      if (article) {
        const imgTags = article.querySelectorAll('img');
        for (let i = 0; i < imgTags.length; i++) {
          imgTags[i].setAttribute('src', data.representativeImageUrls[i]);
        }
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    updateImageUrl();
  }, [updateImageUrl]);

  useScroll(ref);

  return (
    <Wrapper ref={ref}>
      {isLoading && <Spinner />}
      {isSuccess && (
        <>
          <Thumbnail
            url={data.thumbnailImageUrl ?? thumbnail}
            className='thumbnail thumbnail-container'
          >
            <div className='thumbnail__info thumbnail__info-left'>
              <Name>
                [{categoryMap[data.category]}] {data.foodName}
              </Name>
              <Title>{data.title}</Title>
            </div>
            <div className='thumbnail__info thumbnail__info-right'>
              <CreatedAt>
                {new Intl.DateTimeFormat('ko-KR', { dateStyle: 'full' }).format(
                  new Date(data.createdAt)
                )}
              </CreatedAt>
            </div>
          </Thumbnail>
          <Content className='content'>
            <div className='content-left'>
              <Keywords>
                {tags.map((value, idx) => (
                  <Tag key={idx} type='outline' hash={true}>
                    {value}
                  </Tag>
                ))}
              </Keywords>
              <MainContent>
                <div
                  ref={articleRef}
                  className='article'
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              </MainContent>
            </div>
            <div className='content-right'>
              <AuthorInfo className='author-profile'>
                <div className='author-profile__image'>
                  <img
                    src={location.state?.authorProfile ?? defaultProfile}
                    alt='프로필 이미지'
                  />
                </div>
                <div className='author-profile__nickname'>{data.author}</div>
              </AuthorInfo>
              <CommentBox comments={data.replies} boardId={boardId} />
            </div>
          </Content>
        </>
      )}
    </Wrapper>
  );
};

export default BoardDetailPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
const Thumbnail = styled.div`
  position: relative;
  padding: 4rem;
  height: 40rem;
  display: flex;
  align-items: flex-end;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${({ url }) => url}) no-repeat;
  background-size: cover;
  background-position: center center;
  .thumbnail__info {
    color: white;
    font-weight: bold;
  }
  .thumbnail__info-left {
    padding: 0 2rem 0 1.2rem;
    flex: 0 1 60%;
    gap: 1.6rem;
    font-size: 2.2rem;
    line-height: 2.8rem;
  }
  .thumbnail__info-right {
    padding: 0 1.2rem 0 2rem;
    flex: 0 1 40%;
    display: flex;
    font-size: 1.6rem;
    justify-content: flex-end;
  }
`;
const Name = styled.p`
  margin-bottom: 1.6rem;
`;
const Title = styled.p`
  font-size: 3.2rem;
  line-height: 4rem;
`;
const CreatedAt = styled.p``;
const Content = styled.div`
  padding: 4rem;
  display: flex;
  .content-left {
    padding: 0 1.2rem;
    flex: 0 0 60%;
  }
  .content-right {
    padding: 0 1.2rem;
    flex: 0 1 40%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
`;
const Keywords = styled.div``;
const MainContent = styled.div`
  margin-top: 2rem;
  padding-top: 2.2rem;
  .article {
    padding: 0 0.6rem;
    display: flex;
    flex-direction: column;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;
const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  img {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 50%;
  }
  .author-profile__nickname {
    font-size: 1.6rem;
  }
`;
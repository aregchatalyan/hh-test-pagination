'use client';

import qs from 'qs';
import { useCallback, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Alert, Container, Pagination } from 'react-bootstrap';
import styles from './page.module.css';
import type { Data, Query, User } from '@/app/types';
import { calculatePages } from '@/utils/calculatePages';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const params = useSearchParams();
  const [ data, setData ] = useState<Data | null>(null);
  const [ queryOptions, setQueryOptions ] = useState<Query>({ page: 1 });

  const getUsers = useCallback(async (): Promise<Data> => {
    try {
      const query = qs.stringify({
        page: params.get('page') || queryOptions.page,
        take: params.get('take') || queryOptions.take,
        order: params.get('order') || queryOptions.order
      });

      const res = await fetch(`http://localhost:3001/users?${ query }`);

      if (!res.ok) return { statusCode: res.status, users: [] }

      const { data, meta } = await res.json();

      return { statusCode: 200, users: data, meta }
    } catch (e) {
      return { statusCode: 500, users: [] }
    }
  }, []);

  useEffect(() => {
    getUsers().then(setData);
  }, [ queryOptions ]);

  const onSetPage = (v: number) => {
    setQueryOptions(prevState => ({ ...prevState, page: v }));
  }

  const onPageChange = (v: number) => {
    setQueryOptions(prevState => ({ ...prevState, page: prevState.page + v }));
  }

  const pages = calculatePages(queryOptions.page, data?.meta?.pageCount!)

  if (data && data?.statusCode !== 200) {
    return <Alert variant={ 'danger' }>Ошибка { data?.statusCode } при загрузке данных</Alert>
  }

  return (
    <main className={ styles.main }>
      <Container>
        <h1 className={ 'mb-5' }>Пользователи</h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Дата обновления</th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.users.map((user: User) => (
                <tr key={ user.id }>
                  <td>{ user.id }</td>
                  <td>{ user.firstname }</td>
                  <td>{ user.lastname }</td>
                  <td>{ user.phone }</td>
                  <td>{ user.email }</td>
                  <td>{ user.updatedAt.toString() }</td>
                </tr>
              ))
            }
          </tbody>
        </Table>

        { data?.meta &&
          <Pagination>
            <Pagination.First onClick={ () => onSetPage(1) }/>
            <Pagination.Prev onClick={ () => onPageChange(-1) } disabled={ !data.meta.hasPreviousPage }/>

            { pages.map((page) => (
              <Pagination.Item key={ page } onClick={ () => onSetPage(page) } active={ queryOptions.page === page }>
                { page }
              </Pagination.Item>
            )) }

            <Pagination.Ellipsis/>

            <Pagination.Item onClick={ () => onSetPage(data.meta!.pageCount) }
                             active={ queryOptions.page === data.meta.pageCount }>
              { data.meta.pageCount }
            </Pagination.Item>

            <Pagination.Next onClick={ () => onPageChange(1) } disabled={ !data.meta.hasNextPage }/>
            <Pagination.Last onClick={ () => onSetPage(data.meta!.pageCount) }/>
          </Pagination>
        }

      </Container>
    </main>
  );
}

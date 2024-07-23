'use client';

import React, { useEffect } from 'react';
import ReqProgress from './requestProgress';
import ReqFail from './requestFailure';
import DataViewer from '@/components/pages/dataviewer';
import ShareUrl from '@/components/pages/share-url';

export default function CallIDPage({
  params,
}: {
  params: { call_id: string };
}) {
  const [data, setData] = React.useState<any | undefined>();
  const [status, setStatus] = React.useState<number | undefined>();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const formData = new FormData();
    formData.append('call_id', params.call_id);
    const fetchData = async () => {
      fetch(
        `https://the-codeinn--whisper-large-v3-demo-entrypoint.modal.run/call_id`,
        {
          method: 'POST',
          body: formData,
        }
      )
        .then((response) => {
          setStatus(response.status);
          if (response.status == 202) {
            timeoutId = setTimeout(fetchData, 10000);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          setStatus(500);
        });
    };

    fetchData();

    return () => clearTimeout(timeoutId);
  }, []);

  if (status == 202) {
    return <ReqProgress />;
  }

  if (status == 500) {
    return <ReqFail />;
  }

  if (data) {
    return (
      <>
        <div className='container flex flex-col items-center gap-4 max-w-3xl'>
          <DataViewer data={data} />
          <div>
            <div className='opacity-70 font-mono text-base font-medium'>
              Share
            </div>
            <ShareUrl
              host={
                window.location.protocol +
                '//' +
                window.location.host +
                '/tryit'
              }
              call_id={params.call_id}
            />
          </div>
        </div>
      </>
    );
  }
}

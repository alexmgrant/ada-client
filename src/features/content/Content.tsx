import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { NodeContent } from '../../app/models';
import { RootState, useAppDispatch } from '../../app/store';
import { getVariables } from './content-slice';
import { Card } from '../../components';
import ParsedBody from './components/parsed-body/ParsedBody';
import { selectNodeById } from '../../app/nodes-slice';

enum ContentType {
  Text = 'text',
  Image = 'image',
}

const isTypeText = (type: string) => type === ContentType.Text;

const renderBodyType = (type: string) => (bodyContent: string | undefined) => {
  if (isTypeText(type)) {
    return <ParsedBody body={bodyContent as string} />;
  }

  return <img src={bodyContent} alt="" />;
};

const Content = () => {
  const dispatch = useAppDispatch();
  const { contentId } = useSelector((state: RootState) => state.nodeItems);
  const node = useSelector((state: RootState) =>
    selectNodeById(state, contentId)
  );

  useEffect(() => {
    dispatch(getVariables());
  }, [dispatch]);

  const renderContent = (content: NodeContent, index: number) => {
    const { type, body, url } = content;
    const renderBody = renderBodyType(type);

    return (
      <Card key={index}>
        <p>{type}</p>
        <Card secondary={true}>{renderBody(body ?? url)}</Card>
      </Card>
    );
  };

  return (
    <>
      {!!node && !!node.content
        ? node.content.map((content: NodeContent, index: number) =>
            renderContent(content, index)
          )
        : "👈 you'll need to select another node friend."}
    </>
  );
};

export default Content;

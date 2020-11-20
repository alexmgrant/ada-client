import React, { useContext, useEffect } from 'react';
import parse from 'html-react-parser';
import DomPurify from 'dompurify';
import Mark from 'mark.js';

import './ParsedBody.scss';
import { AppContext } from '../../../../App';
import { VariableItem } from '../../../../app/models';
import { useSelector } from 'react-redux';
import {
  getVarIdRegex,
  getObjFromArray,
  getVarFallbackRegex,
} from '../../../../common/utils';
import { selectAllVariables } from '../../content-slice';

type ParsedBodyProps = {
  body: string;
};

const useRenderBody = (body: string) => (variables: VariableItem[]) => {
  return body.replace(/{([^}]+)}/g, (varWithBrackets, varNoBrackets) => {
    const id = varNoBrackets.match(getVarIdRegex)[0];
    const fallback = varNoBrackets.match(getVarFallbackRegex)[0];
    const getVariable = getObjFromArray(variables);
    const variable = getVariable(id);
    const variableValue = variable?.name ?? fallback;

    return `<div class="ada-c-pill">${variableValue}</div>`;
  });
};
const markInstance = new Mark('.parsed-body');

const ParsedBody = ({ body }: ParsedBodyProps) => {
  const variables = useSelector(selectAllVariables);
  const appContext = useContext(AppContext);
  const parsedBody = parse(DomPurify.sanitize(useRenderBody(body)(variables)));

  useEffect(() => {
    markInstance.mark(appContext?.searchQuery as string);

    return () => {
      markInstance.unmark();
    };
  });

  return <div className="parsed-body">{parsedBody}</div>;
};

export default ParsedBody;

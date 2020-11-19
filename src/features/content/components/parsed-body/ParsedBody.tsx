import React from 'react';
import parse from 'html-react-parser';
import DomPurify from 'dompurify';

import './ParsedBody.scss';
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
  return body.replace(/{([^}]+)}/g, (m0, varNoBrackets) => {
    const id = varNoBrackets.match(getVarIdRegex)[0];
    const fallback = varNoBrackets.match(getVarFallbackRegex)[0];
    const getVariable = getObjFromArray(variables);
    const variable = getVariable(id);
    const variableValue = variable?.name ?? fallback;

    return `<div class="ada-c-pill">${variableValue}</div>`;
  });
};

const ParsedBody = ({ body }: ParsedBodyProps) => {
  const variables = useSelector(selectAllVariables);
  const parsedBody = parse(DomPurify.sanitize(useRenderBody(body)(variables)));

  return <>{parsedBody}</>;
};

export default ParsedBody;

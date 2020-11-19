import { AxiosResponse } from 'axios';
import { FormEvent } from 'react';

export const getVarRegexGrouped = /(\{)(.*?)(\|)(.*?)(\})/g;
export const getVarIdRegex = /^.*(?=(\|))/g;
export const getVarFallbackRegex = /(?<=\|).*/g;

export const getEventValue = (event: FormEvent<HTMLInputElement>): string =>
  (event.target as HTMLInputElement).value;

export const getSelectedItem = (collection: any[], key: string, compare: any) =>
  collection.filter((item: any) => item[key] === compare);

export const getData = (response: AxiosResponse<any>) => response.data;

export const getObjFromArray = (array: any[]) => (id: string | number) =>
  array.filter((entry) => entry['id'] === id)[0];

export const getKeyFromArray = (key: string) => (array: any[]) =>
  array.map((item: any) => item[key]);

export const removeDuplicates = (collection: any[]) => (comparitor: any[]) =>
  collection.filter((item) => !comparitor.includes(item));

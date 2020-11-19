import React, { useEffect, useState } from 'react';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { useAppDispatch } from '../../app/store';
import Mark from 'mark.js';

import {
  getNodes,
  nodeUpdated,
  selectNodeIds,
  upsertMany,
} from '../../app/nodes-slice';
import { getNode, search } from '../../common/api-utils';
import { Input } from '../../components';
import { useSelector } from 'react-redux';

const Search = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const nodeIds = useSelector(selectNodeIds);

  useEffect(() => {
    const markInstance = new Mark(document.querySelectorAll('.ada-c-card'));
    const keywordInput: any = document.querySelector("input[name='search']");

    const performMark = () => {
      if (!keywordInput) {
        return;
      }

      let keyword = keywordInput?.value;

      markInstance.unmark({
        done: () => markInstance.mark(keyword),
      });
    };

    const handleSearch$ = of(inputValue)
      .pipe(
        map((query) => query.trim()),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        performMark();

        (async () => {
          if (query.length > 0) {
            const response = await search(query);
            dispatch(upsertMany({ results: [...response], nodeIds }));
          } else {
            dispatch(getNodes());

            (async () => {
              const response = await getNode(1);
              const { id, ...node } = response;

              dispatch(nodeUpdated({ id, changes: node }));
            })();
          }
        })();
      });

    return () => handleSearch$.unsubscribe();
  }, [inputValue, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <label htmlFor="search">Search Nodes</label>
      <Input
        placeholder="search"
        name="search"
        onInputChange={(query: string) => setInputValue(query)}
      />
    </>
  );
};

export default Search;

import React, { useContext, useEffect } from 'react';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { useAppDispatch } from '../../app/store';

import { AppContext } from '../../App';
import { getNodes, selectNodeIds, upsertMany } from '../../app/nodes-slice';
import { search } from '../../common/api-utils';
import { Input } from '../../components';
import { useSelector } from 'react-redux';

const Search = () => {
  const dispatch = useAppDispatch();
  const appContext = useContext(AppContext);
  const nodeIds = useSelector(selectNodeIds);

  useEffect(() => {
    const handleSearch$ = of(appContext?.searchQuery)
      .pipe(
        map((query) => (query as string).trim()),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        (async () => {
          appContext?.setCurrentNodeId(0);
          if (query.length > 0) {
            const response = await search(query);
            dispatch(upsertMany({ results: [...response], nodeIds }));
          } else {
            dispatch(getNodes());
          }
        })();
      });

    return () => handleSearch$.unsubscribe();
  }, [appContext?.searchQuery, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <label htmlFor="search">Search Nodes</label>
      <Input
        placeholder="search"
        name="search"
        onInputChange={(query: string) => appContext?.setSearchQuery(query)}
      />
    </>
  );
};

export default Search;

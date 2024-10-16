import { useState } from 'react';
import { User } from './types';
import { CiSearch } from 'react-icons/ci';
import { Highlight } from './Highlight';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './state/store';
import { searchUsers, setUsers } from './state/users/usersSlice';

export const Search = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);

  return (
    <>
      <div className='input-wrapper'>
        <div className='dropdown-wrapper'>
          <input
            value={currentQuery}
            type='text'
            className='search'
            placeholder='Search...'
            onChange={e => {
              const { value } = e.target;
              setCurrentQuery(value);
              if (value.length === 0 || value.length >= 1) {
                dispatch(searchUsers(value));
              }
            }}
            onFocus={() => {
              dispatch(searchUsers(currentQuery));
              setShowDropdown(true);
            }}
            onBlur={() => setShowDropdown(false)}
          />
          {showDropdown && users.length && (
            <ul className='dropdown'>
              {users.map(({ name, id, image_url, work_title }: User) => (
                <li
                  className='item'
                  key={id}
                  onClick={() => {
                    setCurrentQuery(name);
                    dispatch(searchUsers(name));
                  }}
                  onMouseDown={e => e.preventDefault()}
                >
                  <div className='item-content'>
                    <img src={image_url} />
                    <div className='item-text'>
                      <span className='item-name'>
                        <Highlight query={currentQuery} text={name} />
                      </span>
                      <Highlight query={currentQuery} text={work_title} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className='search-button'>
          <CiSearch />
        </button>
      </div>
    </>
  );
};

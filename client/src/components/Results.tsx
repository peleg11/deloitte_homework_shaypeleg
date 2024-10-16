import { User } from '../types';

interface Props {
  users: User[];
}

export const Results = ({ users }: Props) => (
  <ul className='results'>
    {users.map(({ name, id, image_url, work_title }: User) => (
      <li className='item' key={id}>
        <div className='item-content'>
          <img src={image_url} />
          <div className='item-text'>
            <span className='item-name'>{name}</span>
            {work_title}
          </div>
        </div>
      </li>
    ))}
  </ul>
);

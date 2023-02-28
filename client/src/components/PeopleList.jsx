import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import './css/peopleList.css';
import { getAvatarFileName, getId, getNickName } from '../store/selectors';
import { SERVER_URL } from '../util/constants';

export const PeopleList = () => {
  const navigate = useNavigate();
  const id = useSelector(getId);
  const [peopleList, setPeopleList] = useState([]);
  const avatarFileName = useSelector(getAvatarFileName);
  const nickName = useSelector(getNickName);

  useEffect(() => {
    if (!id) navigate('/login');
    (async () => {
      try {
        const peopleArray = (await axios.get(SERVER_URL)).data;
        setPeopleList(peopleArray.filter((item) => item._id !== id));
      } catch (e) {
        console.log(e.message);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAge = (birthday) => {
    const age = moment().diff(moment(birthday, 'YYYY-MM-DD'), 'years', false);
    const remainder = age % 10;
    let postfix;
    if (remainder === 1) postfix = 'год';
    else if (remainder > 4 || remainder === 0) postfix = 'лет';
    else postfix = 'года';
    return `${age} ${postfix}`;
  };

  return (
    <section className='listing'>
      <Link to='/account' className='link'>
        <img
          src={`${SERVER_URL}/avatar/${avatarFileName}`}
          alt='userPhoto'
          className='avatar'
        />
        <p className='user-name'>{nickName}</p>
        <p className='tooltip'>Редактировать профиль</p>
      </Link>
      {!peopleList.length ? (
        <h1 className='listing__heading'>
          Вы являетесь единственным пользователем этого приложения!!!
        </h1>
      ) : (
        <>
          <h1 className='listing__heading'>Список пользователей</h1>
          <div className='card-list'>
            {peopleList.map((item, index) => (
              <div className='card' key={index}>
                <img
                  src={`${SERVER_URL}/avatar/${item.avatarFileName}`}
                  alt='noPhoto'
                  className='card__image'
                />
                <div className='card__discription'>
                  <p className='card__name'>
                    Имя: <span className='bold'>{item.nickName}</span>
                  </p>
                  <p className='card__age'>
                    Возраст:{' '}
                    <span className='bold'>{getAge(item.birthday)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

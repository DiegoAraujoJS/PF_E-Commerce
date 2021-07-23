import React from 'react';
import style from './Pagination.module.css';
import { Link } from 'react-router-dom';

export default function Pagination(props) {

    function handleClick(e) {
        const page = e.target.childNodes[0].data;
        props.setOffset(page * props.limit - props.limit);
      }

    function showPagination() {
        let pageItems = [];
        if (props.count) {
          for (let i = 1; i <= Math.ceil(props.count / props.limit); i++) {
            pageItems.push(
              <li className={style.pageItem} key={i}>
                <Link
                  to="/claim"
                  className={style.pageLink}
                  onClick={handleClick}
                >
                  {i}
                </Link>
              </li>
            );
          }
        }
        return pageItems;
      }

    return (
        <nav className={style.page}>
            <ul className={style.pagination}>{showPagination()}</ul>
        </nav>
    )
}

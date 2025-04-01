import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeLikedMovie } from '../../redux/movieSlice';
import navLogo from "./assets/Services-4.png";
import { NavLink } from 'react-router-dom';
import { HeartFilled } from '@ant-design/icons';
import { Modal, Table, Button } from 'antd';
import "./Navbar.css";

function Navbar() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { likedMovies } = useSelector((store) => store.movies);
  const dispatch = useDispatch();

  const toggleLikes = () => setIsModalVisible(!isModalVisible);

  const handleRemoveMovie = (movieId) => {
    dispatch(removeLikedMovie(movieId));
  };

  const columns = [
    {
      title: 'Şəkil',
      dataIndex: 'poster',
      render: (text, record) => (
        <img src={`https://image.tmdb.org/t/p/w500${record.poster_path}`} alt={record.title} style={{ width: "50px", height: "75px" }} />
      ),
    },
    {
      title: 'Film Adı',
      dataIndex: 'title',
    },
    {
      title: 'Sil',
      render: (text, record) => (
        <Button type="primary" danger onClick={() => handleRemoveMovie(record.id)}>Sil</Button>
      ),
    },
  ];

  return (
    <div className='nav-container'>
      <div className='nav-logo'>
        <img src={navLogo} style={{ width: "50px", height: "50px" }} alt="Logo" />
        <span className='vidstream'>vidstream</span>
      </div>
      <div className='nav-link'>
        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
        <NavLink to="/movie" className={({ isActive }) => isActive ? "active-link" : ""}>Movie</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink>
      </div>
      <div className='like' onClick={toggleLikes}>
        <HeartFilled style={{ color: 'red', fontSize: 30 }} />
        <span className='liked-count'><p>{likedMovies.length}</p></span>
      </div>

      {/* Modal */}
      <Modal
        title="Liked Movies"
        open={isModalVisible}
        onCancel={toggleLikes}
        footer={null}
        width={600}
      >
        {likedMovies.length > 0 ? (
          <Table
            dataSource={likedMovies}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        ) : (
          <p>No liked movies yet</p>
        )}
      </Modal>
    </div>
  );
}

export default Navbar;

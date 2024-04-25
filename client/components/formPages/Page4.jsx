import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { updateBudget } from '../../reducers/tripReducer';

const Page4 = () => {
  const navigate = useNavigate();

  const { budget } = useSelector(state => state.trip);
  
  const dispatch = useDispatch();

  const handleInputChange = e => {
    const { value } = e.target;
    dispatch(updateBudget(value));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/form/page5');
    }
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black">
      <label className='text-2xl' htmlFor="budget">
        Budget:
      </label>
      <input className='typed-input'
        type="number"
        name="budget"
        value={budget}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div>
        <Link to='/form/page3'>
          <button className='m-4 underline text-blue-600' type='button'>Back</button>
        </Link>
        <Link to='/form/page5'>
          <button className='m-4 underline text-blue-600' type='button'>Next</button>
        </Link>
      </div>
    </div>
  );
};

export default Page4;
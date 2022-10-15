import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSpotById } from '../../store/spots';

// const SpotDetail = () => {
//     const { spotId } = useParams
//     const targetSpot = useSelector(state => state.)
// }


// const ReportIndexItem = ({ report }) => {
//     const dispatch = useDispatch()
//     const deleteReport = (e) => {
//       e.preventDefault();
//       dispatch(actionDeleteReports(report.id))
//     };

//     return (
//       <li>
//         <Link to={`/reports/${report.id}`}>Report #{report.id}</Link>
//         <Link to={`/reports/${report.id}/edit`}>Edit</Link>
//         <button onClick={deleteReport}>Delete</button>
//       </li>
//     );
//   };

//   export default ReportIndexItem;

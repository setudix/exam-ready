// import routes from '@/app/routes';
// import { Container } from '@mui/material';
// import axios from 'axios';
// import Error from 'next/error';
// import { useRouter } from 'next/router';
// import React, { useCallback, useEffect, useState } from 'react'

// const Page = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<any>(null);

//   const fetchData = useCallback(async ()=> {
//     try{
//       setLoading(true);
//       const response = await axios.get(routes.getExamById, {
//         params: {
//           examId: id,
//         },
//       });
//       setData(response.data);

//     } catch (error : any){
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   },[]);

//   return (
//     <>
//       <Container >

//       <pre>
//         {data}
//       </pre>

//       </Container>
//     </>
//   )
// }

// export default Page
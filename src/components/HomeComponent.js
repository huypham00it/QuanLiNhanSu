import React from 'react';
import {Card, CardFooter} from 'reactstrap';

import { Loading } from './LoadingComponent';

const Home = ({staffs, departments, staffsLoading, staffsErrMess, departmentsLoading, departmentsErrMess}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">
                    <Card className="p-2 m-2 d-flex align-items-center justify-content-center bg-light border-primary" style={{height: "60vh"}}>
                        <h3 className="text-primary">Tổng số nhân viên:</h3>
                        <CardFooter className="text-muted" style={{fontSize: "40px"}}>{staffs.length}</CardFooter>
                    </Card>
                </div>
                <div className="col-12 col-md-6">
                    <Card className="p-2 m-2 d-flex align-items-center justify-content-center bg-light border-primary" style={{height: "60vh"}}>
                        <h3 className="text-primary">Tổng số phòng ban:</h3>
                        <CardFooter className="text-muted" style={{fontSize: "40px"}}>{departments.length}</CardFooter>
                    </Card>               
                </div>
            </div>
            
        </div>
    );
}

export default Home;
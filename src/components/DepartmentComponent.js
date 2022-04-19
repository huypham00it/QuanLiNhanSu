import React from 'react';
import {Card} from 'reactstrap';
import { Link } from 'react-router-dom'

const Department = ({departments}) => {
    return (
        <div className="container">
            <div className="row">
                {departments.map(department => (
                    <Link to={'departments/' + department.id} key={department.id} className="col-12 col-md-6 col-lg-4 p-2">
                        <Card>
                            <h4>{department.name}</h4>
                            <p className="mx-4">{department.numberOfStaff}</p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Department;
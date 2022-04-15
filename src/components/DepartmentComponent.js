import React from 'react';
import {Card} from 'reactstrap';

const Department = ({departments}) => {
    return (
        <div className="container">
            <div className="row">
                {departments.map(department => (
                    <div key={department.id} className="col-12 col-md-6 col-lg-4 p-2">
                        <Card>
                            <h4>{department.name}</h4>
                            <p className="mx-4">{department.numberOfStaff}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Department;
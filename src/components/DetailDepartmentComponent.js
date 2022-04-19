import React from 'react';
import {Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import Staff  from './StaffsComponent';

const DetailDepartment = ({staffs, department}) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/departments">Phòng ban</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {department.name}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            {staffs.length > 0 ? <Staff staffs={staffs} /> : <h4>Không có nhân viên!</h4> }
        </div>
    )
}

export default DetailDepartment;
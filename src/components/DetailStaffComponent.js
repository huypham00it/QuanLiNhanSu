import React from 'react';
import {Breadcrumb, BreadcrumbItem, CardImg} from 'reactstrap';
import dateFormat from 'dateformat';
import {Link} from 'react-router-dom';

const DetailStaff = ({staff}) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/staffs">Nhân viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {staff.name}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                <div className="col-12 col-md-4">
                    <CardImg src={staff.image} alt={staff.name} />
                </div>
                <div className="col-12 col-md-8">
                    <h3>Họ và tên: {staff.name}</h3>
                    <p>Ngày sinh: {dateFormat(staff.doB,"dd/mm/yyyy")}</p>
                    <p>Ngày vào công ty: {dateFormat(staff.startDate, 'dd/mm/yyyy')}</p>
                    <p>Phòng ban: {staff.department.name}</p>
                    <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                    <p>Số ngày đã làm thêm: {staff.overTime}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailStaff;
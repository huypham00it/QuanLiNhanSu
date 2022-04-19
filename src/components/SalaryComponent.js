import React, { useState } from 'react';
import {Card, BreadcrumbItem, Breadcrumb, CardFooter} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Fade} from 'react-animation-components';

const Salary = ({staffsSalary}) => {

    const [name, setName] = useState("");
    const [sort, setSort] = useState(false);

    const staffsFilter = staffsSalary.filter(staff => staff.name.toLowerCase().indexOf(name.toLowerCase()) !== -1)

    if(sort) {
        staffsFilter.sort((a, b) => ((a.salaryScale * 3000000 + a.overTime/8 * 200000) - (b.salaryScale * 3000000 + b.overTime/8 * 200000)))
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/staffs">Nhân viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        Bảng lương
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Bảng lương</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <h5>Tìm kiếm nhân viên</h5>
                    <input className="form-control" type="text" placeholder="Nhập tên nhân viên" 
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <h5>Sắp xếp theo lương</h5>
                    <button className={sort ? 'btn btn-block btn-light' : 'btn btn-block btn-primary'}
                        onClick={() => setSort(!sort)}
                    >
                        Sort
                    </button>
                </div>
            </div>
            <div className="row">
                    {staffsFilter.length > 0 ? staffsFilter.map(staff => {
                        return (
                            <div key={staff.id} className="col-12 col-md-6 col-lg-4 my-2">
                                <Fade in>
                                    <Card className="p-2">
                                        <h3>{staff.name}</h3>
                                        <p>Mã nhân viên: {staff.id}</p>
                                        <p>Hệ số lương: {staff.salaryScale}</p>
                                        <p>Số giờ làm thêm: {staff.overTime}</p>
                                        <CardFooter className="text-muted">
                                            <p>Lương: {Math.round(staff.salaryScale * 3000000 + (staff.overTime/8) * 200000,0)}</p>
                                        </CardFooter>
                                    </Card>
                                </Fade>
                            </div>
                        )
                    }) : "Không tìm thấy nhân viên"}
            </div>
        </div>
    );
}

export default Salary;
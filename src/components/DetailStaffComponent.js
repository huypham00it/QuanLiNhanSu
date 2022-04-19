import React, {useState} from 'react';
import {Breadcrumb, BreadcrumbItem, CardImg, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import dateFormat from 'dateformat';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len) && (val !== "");

const DetailStaff = ({staff, departments}) => {
    const department = departments.filter(department => department.id === staff.departmentId)[0].name;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [doB, setDoB] = useState(new Date(staff.doB).toString());
    const [startDate, setStartDate] = useState(new Date(staff.startDate).toString());
    const [annualLeave, setAnnualLeave] = useState(staff.annualLeave);
    const [overTime, setOverTime] = useState(staff.overTime);
    const [salaryScale, setSalaryScale] = useState(staff.salaryScale);
    const [currDepartment, setCurrDepartment] = useState(staff.departmentId);

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    
    const handleSubmit = (values) => {
        console.log(values)
    } 

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
                    <p>Phòng ban: {department}</p>
                    <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                    <p>Số ngày đã làm thêm: {staff.overTime}</p>
                    <Button onClick={toggleModal} className="mx-2" color="primary">Chỉnh sửa</Button>
                    <Button className="btn-warning">Xóa</Button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    
                    <ModalBody>
                        <LocalForm onSubmit={(values) => handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name">Tên</Label>
                                <Col>
                                    <Control.text 
                                        model=".name"
                                        className="form-control"
                                        id="name" name="name" 
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(30)
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu nhập",
                                            minLength: "Yêu cầu từ 2 ký tự trở lên",
                                            maxLength: "Yêu cầu ít hơn 30 ký tự"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="dayofbirth">Ngày sinh</Label>
                                <Col>
                                    <Control
                                        className="form-control"
                                        model=".dayofbirth"
                                        type="date" id="dayofbirth" name="dayofbirth" 
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".dayofbirth"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu nhập"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startdate">Ngày vào công ty</Label>
                                <Col>
                                    <Control
                                        className="form-control"
                                        model=".startdate"
                                        type="date" id="startdate" name="startdate" 
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".startdate"
                                        show="touched"
                                        messages={{
                                            required: "Yêu cầu nhập"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="department">Phòng ban</Label>
                                <Col>
                                    <Control.select 
                                        className="form-control"
                                        model=".department"
                                        id="department" name="department"
                                    >
                                        {departments.map((ele) => (
                                            <option key={ele.id}>{ele.name}</option>
                                        ))}
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryscale">Hệ số lương</Label>
                                <Col>
                                    <Control.text
                                        className="form-control"
                                        model=".salaryscale"
                                        type="number"
                                        id="salaryscale" name="salaryscale" 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualleave">Số ngày nghỉ còn lại</Label>
                                <Col>
                                    <Control
                                        className="form-control"
                                        model=".annualleave"
                                        type="number" id="anualleave" name="anualleave" 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overtime">Số ngày đã làm thêm</Label>
                                <Col>
                                    <Control
                                        className="form-control"
                                        model=".overtime"
                                        type="number" id="overtime" name="overtime" 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Button type="submit">Thêm</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        </div>
    )
}

export default DetailStaff;
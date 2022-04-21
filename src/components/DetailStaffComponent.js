import React, {useState} from 'react';
import {Breadcrumb, BreadcrumbItem, CardImg, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import dateFormat from 'dateformat';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len) && (val !== "");

const DetailStaff = ({staff, departments, onUpdateStaff, onDeleteStaff}) => {
    const department = departments.filter(department => department.id === staff.departmentId)[0].name;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    
    const handleUpdate = (values) => {
        const updatedStaff = {
            id: staff.id,
            name : values.name,
            doB : new Date(values.dayofbirth).toISOString(),
            salaryScale: parseInt(values.salaryscale),
            startDate : new Date(values.startdate).toISOString(),
            departmentId :values.department,
            annualLeave : values.annualleave,
            overTime : values.overtime,
            image : '/assets/images/alberto.png',
            salary : (3000000 * parseInt(values.salaryscale)) + (values.overtime / 8 * 200000),
        }

        onUpdateStaff(updatedStaff);
    } 

    const handleDelete = (id) => {
        onDeleteStaff(id);
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
                    <Button onClick={() => handleDelete(staff.id)} className="btn-warning">Xóa</Button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    
                    <ModalBody>
                        <LocalForm onSubmit={(values) => handleUpdate(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name">Tên</Label>
                                <Col>
                                    <Control.text 
                                        model=".name"
                                        className="form-control"
                                        id="name" name="name" 
                                        defaultValue={staff.name}
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
                                        defaultValue={dateFormat(staff.doB, 'yyyy-mm-dd')}
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
                                        defaultValue={dateFormat(staff.startDate, 'yyyy-mm-dd')} 
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
                                        defaultValue={staff.departmentId}
                                    >
                                        <option value={staff.departmentId}>{department}</option>
                                        {departments.filter(dept => dept.id !== staff.departmentId).map((ele) => (
                                            <option key={ele.id} value={ele.id}>{ele.name}</option>
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
                                        defaultValue={staff.salaryScale}
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
                                        defaultValue={staff.annualLeave}
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
                                        defaultValue={staff.overTime}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Button type="submit">Sửa</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        </div>
    )
}

export default DetailStaff;
import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Label, Input, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Staff from './StaffsComponent';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len) && (val !== "");

class StaffFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterName: "",
            filterDepartment: "",
            sortName: false,
            isModalOpen: false,
            dayofbirth: new Date().toString(),
            startdate: new Date().toString(),
            annualleave: 0,
            overTime: 0,
            salaryscale: 1,
            department: 'Sale'
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(event){
        this.setState({
            filterName: this.filtername.value
        })

        event.preventDefault();
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        
        const newStaff = {
            id: JSON.parse(localStorage.getItem('staffs')).length,
            name: values.name,
            doB: new Date(values.dayofbirth).toISOString(),
            salaryScale: parseInt(values.salaryscale),
            startDate: new Date(values.startdate).toISOString(),
            department: this.props.departments.filter((department) => department.name === values.department)[0],
            annualLeave: parseInt(values.annualleave),
            overTime: parseInt(values.overtime),
            image: '/assets/images/default.jpg'
        }

        const staffs = JSON.parse(localStorage.getItem('staffs'))
        staffs.push(newStaff);
        localStorage.removeItem('staffs')
        localStorage.setItem('staffs', JSON.stringify(staffs));
        this.setState({
            dayofbirth: new Date().toString(),
            startdate: new Date().toString(),
            annualleave: 0,
            overTime: 0,
            salaryscale: 1,
            department: 'Sale'
        })
        this.toggleModal()
    }

    render() {
        const currentStaffs = JSON.parse(localStorage.getItem('staffs'))
        const staffs = currentStaffs.filter((staff => staff.name.toLowerCase().indexOf(this.state.filterName.toLocaleLowerCase()) !== -1 && staff.department.name.indexOf(this.state.filterDepartment) !== -1));
        if(this.state.sortName){
            staffs.sort(function(a, b){
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                
                if(nameA < nameB) {
                    return -1;
                }

                if(nameA > nameB) {
                    return 1;
                }

                return 0;
            })
        }

        return (
            <div className="container">
                 <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Trang chủ</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Nhân viên
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="row mb-2">
                        <div className="col-10 col-md-11">
                            <h3>Nhân viên</h3>
                        </div>
                        <div className="col-2 col-md-1">
                            <Button className="w-100"
                                onClick={this.toggleModal}
                            >
                                <span className="fa fa-plus"></span>
                            </Button>
                        </div>
                    </div>
                        <hr />
                </div>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <Form onSubmit={this.handleSearch}>
                            <h5>Tìm kiếm nhân viên</h5>
                            <FormGroup row onSubmit={this.handleSearch}>
                                <Col>
                                    <Input 
                                        id="filtername" name="filtername"
                                        type="text" placeholder="Nhập tên nhân viên" className="form-control" 
                                        innerRef = {(input) => this.filtername = input}
                                    />
                                </Col>
                                    <Col>
                                        <Button type="submit" className="btn-primary">
                                            Tìm
                                        </Button>
                                    </Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="col-12 col-md-4">
                        <h5>Lọc theo phòng ban</h5>
                        <select className="form-control"
                            value={this.state.filterDepartment}
                            onChange={(e) => this.setState({filterDepartment: e.target.value})}
                        >
                            <option value="" >All</option>
                            {this.props.departments.map(department => (
                                <option key={department.id} value={department.name}>{department.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-4">
                        <h5>Sắp xếp theo tên</h5>
                        <button className={this.state.sortName ? 'btn btn-light' : 'btn btn-primary'}
                            onClick={() => this.setState({sortName: !this.state.sortName})}
                        >
                            A-Z
                        </button>
    
                        
                    </div>

                    <Staff staffs={staffs} />
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Thêm Nhân Viên
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
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
                                        value={this.state.dayofbirth}
                                        onChange={(e) => this.setState({dayofbirth: e.target.value})}
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
                                        value={this.state.startdate}
                                        onChange={(e) => this.setState({startdate: e.target.value})}
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
                                        defaultValue={this.state.department}
                                    >
                                        {this.props.departments.map((ele) => (
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
                                        value={this.state.salaryscale}
                                        defaultValue={this.state.salaryscale}
                                        onChange={(e) => this.setState({salaryscale: e.target.value})}
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
                                        value={this.state.annualleave}
                                        defaultValue={this.state.annualleave}
                                        onChange={(e) => this.setState({anualleave: e.target.value})}
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
                                        value={this.state.overTime}
                                        defaultValue={this.state.overTime}
                                        onChange={(e) => this.setState({overTime: e.target.value})}
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
        );
    }
}

export default StaffFilter;
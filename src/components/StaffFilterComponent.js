import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Modal,
         ModalHeader, ModalBody, FormGroup, Form, 
         Label, Input, Col, Row, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import Staff from './StaffsComponent';
import Loading from './LoadingComponent';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

class StaffFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterName: "",
            filterDepartment: "",
            sortName: false,
            isModalOpen: false,
            doB: "",
            startDate: "",
            departmentId: "Dept01",
            image: "/assets/images/alberto.png",
            touched: {
                doB: false,
                startDate: false
            }
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true }
        });

    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });

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
        if(!this.state.doB || !this.state.startDate)
            this.setState({
                touched: {
                    doB: true,
                    startDate: true
                }
            })
        else {
            const name = values.name;
            const doB = new Date(this.state.doB).toISOString();
            const salaryScale= parseInt(values.salaryscale);
            const startDate = new Date(this.state.startDate).toISOString();
            const departmentId =this.state.departmentId;
            const annualLeave = values.annualleave;
            const overTime = values.overtime;
            const image = '/assets/images/alberto.png';
            const salary = (3000000 * salaryScale) + (overTime / 8 * 200000);

            this.props.postStaff(name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary)
        }
    }

    //check input date

    validate(doB, startDate) {
        const errors = {
            doB: "",
            startDate: ""
        };

        if (this.state.touched.doB && doB.length < 1)
            errors.doB = "Y??u c???u nh???p ";
        if (this.state.touched.startDate && startDate.length < 1)
            errors.startDate = "Y??u c???u nh???p";
        
        return errors;
    }

    render() {
        const staffsList = this.props.staffs;
        const staffs = staffsList.filter((staff) => {
            if ( this.state.filterName === "") return staff;
            else if( staff.name.toLowerCase().includes(this.state.filterName.toLowerCase()) && staff.departmentId.includes(this.state.filterDepartment))
                return staff;
            return 0;
            })
        const errors = this.validate(this.state.doB, this.state.startDate)

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
                            <Link to="/home">Trang ch???</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Nh??n vi??n
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="row mb-2">
                        <div className="col-10 col-md-11">
                            <h3>Nh??n vi??n</h3>
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
                            <h5>T??m ki???m nh??n vi??n</h5>
                            <FormGroup row onSubmit={this.handleSearch}>
                                <Col>
                                    <Input 
                                        id="filtername" name="filtername"
                                        type="text" placeholder="Nh???p t??n nh??n vi??n" className="form-control" 
                                        innerRef = {(input) => this.filtername = input}
                                    />
                                </Col>
                                    <Col>
                                        <Button type="submit" className="btn-primary">
                                            T??m
                                        </Button>
                                    </Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="col-12 col-md-4">
                        <h5>L???c theo ph??ng ban</h5>
                        <select className="form-control"
                            value={this.state.filterDepartment}
                            onChange={(e) => this.setState({filterDepartment: e.target.value})}
                        >
                            <option value="" >All</option>
                            {this.props.departments.map(department => (
                                <option key={department.id} value={department.id}>{department.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-4">
                        <h5>S???p x???p theo t??n</h5>
                        <button className={this.state.sortName ? 'btn btn-light' : 'btn btn-primary'}
                            onClick={() => this.setState({sortName: !this.state.sortName})}
                        >
                            A-Z
                        </button>
    
                        
                    </div>
                    {this.props.staffsLoading ? <Loading /> : <Staff staffs={staffs} />}
                    {this.props.staffsFailed && <h4>{staffs.errMess}</h4>}     
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Th??m Nh??n Vi??n
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="control-group">
                                <Label htmlFor="name" md={4}>T??n</Label>
                                <Col md={8}>
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
                                            required: "Y??u c???u nh???p",
                                            minLength: " t??? 2 k?? t??? tr??? l??n",
                                            maxLength: "Y??u c???u ??t h??n 30 k?? t???"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="doB" md={4}>Ng??y sinh</Label>
                                <Col md={8}>
                                    <Input
                                        type="date"
                                        id="doB" 
                                        name="doB" 
                                        valid={errors.doB === ""}
                                        invalid={errors.doB !== ""}
                                        onBlur={this.handleBlur("doB")}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.doB}</FormFeedback>
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="startdate" md={4}>Ng??y v??o c??ng ty</Label>
                                <Col md={8}>
                                    <Input
                                        type="date" 
                                        id="startDate" 
                                        name="startDate" 
                                        valid={errors.startDate === ""}
                                        invalid={errors.startDate !== ""}
                                        onBlur={this.handleBlur("startDate")}
                                        onChange={this.handleInputChange}
                                    />
                                    <FormFeedback>{errors.startDate}</FormFeedback>
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="department" md={4}>Ph??ng ban</Label>
                                <Col md={8}>
                                    <select 
                                        id="department" 
                                        name="department"
                                        value={this.state.departmentId}
                                        onChange={(e) => this.setState({departmentId: e.target.value})}
                                    >
                                        {this.props.departments.map((ele) => (
                                            <option key={ele.id} value={ele.id}>{ele.name}</option>
                                        ))}
                                    </select>
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="salaryscale" md={4}>H??? s??? l????ng</Label>
                                <Col md={8}>
                                    <Control.text
                                        className="form-control"
                                        model=".salaryscale"
                                        type="number"
                                        id="salaryscale" 
                                        name="salaryscale" 
                                        defaultValue="1"
                                        validators = {{
                                            required,
                                            isNumber
                                        }}
                                    />
                                    <Errors 
                                        model=".salaryscale"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Y??u c???u nh???p",
                                            isNumber: "Ph???i l?? ch??? s???"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="annualleave" md={4}>S??? ng??y ngh??? c??n l???i</Label>
                                <Col md={8}>
                                    <Control
                                        className="form-control"
                                        model=".annualleave"
                                        type="number" 
                                        id="anualleave" 
                                        name="anualleave" 
                                        defaultValue="0"
                                        validators = {{
                                            required,
                                            isNumber
                                        }}
                                    />
                                    <Errors 
                                        model=".salaryscale"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Y??u c???u nh???p",
                                            isNumber: "Ph???i l?? ch??? s???"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="control-group">
                                <Label htmlFor="overtime" md={4}>S??? ng??y ???? l??m th??m</Label>
                                <Col md={8}>
                                    <Control
                                        className="form-control"
                                        model=".overtime"
                                        type="number" 
                                        id="overtime" 
                                        name="overtime" 
                                        defaultValue="0"
                                        validators = {{
                                            required,
                                            isNumber
                                        }}
                                    />
                                    <Errors 
                                        model=".salaryscale"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Y??u c???u nh???p",
                                            isNumber: "Ph???i l?? ch??? s???"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="control-group mt-2">
                                <Button type="submit">Th??m</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default StaffFilter;
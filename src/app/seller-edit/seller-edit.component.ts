import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Seller } from '../seller';
import { ApiResponse } from '../api-response';

import { UtilService } from '../util.service';
import { SellerService } from '../seller.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-seller-edit',
  templateUrl: './seller-edit.component.html',
  styleUrls: ['./seller-edit.component.css']
})
export class SellerEditComponent implements OnInit {

  seller: Seller;
  errorResponse: ApiResponse;
  form: FormGroup;

  formErrors = {
    'currentPassword':'',
    'userID':'',
    'sellerNo': '',
    'storeName':'',
    'phone':'',
    'email':'',
    'newPassword':'',
    'confirmPassword':'',
  };
  formErrorMessages = {
    'userID': {
      'required': '아이디를 입력하세요.',
      'pattern': '8~16자의 영문 숫자 조합입니다.',
    },
    'currentPassword': {
      'required': '현재 비밀번호를 입력하세요.',
    },
    'sellerNo': {
      'required': '영업인 번호를 입력하세요.',
      'pattern': '숫자만 입력하세요.',
    },
    'storeName': {
      'required': '상호를 입력하세요.',
      'pattern': '2~40 글자입니다.',
    },
    'phone': {
      'pattern': '전화번호 형식("-"포함)으로 입력하세요.',
    },
    'email': {
      'pattern': '메일주소가 아닙니다.',
    },
    'newPassword': {
      'pattern': '8~16자의 영문 숫자 조합입니다.',
    },
    'confirmPassword': {
      'match': '비밀번호와 확인이 일치하지 않습니다.',
    },
  };

  buildForm(): void {
    this.form = this.formBuilder.group({
      currentPassword:["", [Validators.required]],
      userID:[this.seller.userID, [Validators.required, Validators.pattern(/^.{8,16}$/)]],
      name:[this.seller.name],
      sellerNo:[this.seller.sellerNo, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      storeName:[this.seller.storeName, [Validators.required, Validators.pattern(/^.{2,40}$/)]],
      phone:[this.seller.phone, [Validators.required, Validators.pattern(/^\d{2,3}-\d{3,4}-\d{4}$/)]],
      email:[this.seller.email, [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      newPassword:["", [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/)]],
      confirmPassword:[""],
    }, {
      validator: this.customValidation,
    });

    this.form.valueChanges.subscribe(data => {
      this.utilService.updateFormErrors(this.form, this.formErrors, this.formErrorMessages);
    });
  };

  customValidation(group: FormGroup) {
    var password = group.get('newPassword');
    var confirmPassword = group.get('confirmPassword');
    
    if(password.dirty && confirmPassword.dirty && password.value != confirmPassword.value){
      confirmPassword.setErrors({'match': true});
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private sellerService: SellerService,
    public authService: AuthService,
  ) { 
    this.seller = this.route.snapshot.data['seller'];
    this.buildForm();
  }

  ngOnInit() {
  }

  submit() {
    this.utilService.makeFormDirtyAndUpdateErrors(this.form, this.formErrors, this.formErrorMessages);
    if(this.form.valid){
      this.sellerService.update(this.seller.userID, this.form.value)
      .then(data =>{
        this.router.navigate(['/', 'sellers', this.seller.userID]);
      })
      .catch(response =>{
        this.errorResponse = response;
        this.utilService.handleFormSubmitError(this.errorResponse, this.form, this.formErrors);
      });
    }
  }

  delete() {
    var answer = confirm("당신의 사용자 계정을 삭제하시겠습니까?");
    if(answer){
      this.sellerService.destroy(this.seller.userID)
      .then(data =>{
        this.authService.logout();
      })
      .catch(response =>{
        this.errorResponse = response;
        this.utilService.handleFormSubmitError(this.errorResponse, this.form, this.formErrors);
      });
    }
  }

}

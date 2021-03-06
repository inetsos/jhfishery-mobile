import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS} from '../date.adapter';

import { ApiResponse } from '../api-response';

import { Invoice } from '../invoice';
import { InvoiceSimple } from '../invoice-simple';
import { InvoiceService } from '../invoice.service';
import { UtilService } from '../util.service';
import { AuthService } from '../auth.service';
import { UnstoringService } from '../unstoring.service';
import { Unstoring } from '../unstoring';

@Component({
  selector: 'app-invoice-unstoring',
  templateUrl: './invoice-unstoring.component.html',
  styleUrls: ['./invoice-unstoring.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class InvoiceUnstoringComponent implements OnInit {

  invoice: Invoice;
  invoiceSimple = {} as InvoiceSimple;

  id: string;
  index: number;

  unstorings: Unstoring[] = [];

  errorResponse: ApiResponse;
  theForm: FormGroup;
  navigationSubscription;
  mydate = new Date();
  // 매출일 OutDate, 매출수량 OutNumber, 매출 금액 OutSum, 매출처 OutPurchase
  outDate = ''; // Date = new Date();
  outNumber = 0;
  outPrice = 0;
  outSum = 0;
  outPurchase = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService,
    private invoiceService: InvoiceService, private utilService: UtilService, private formBuilder: FormBuilder,
    private unstoringService: UnstoringService) {

      this.theForm = formBuilder.group({
        'outDate' : [null, Validators.required],
        'outNumber' : [null,  [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        'outPrice' : [null,  [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        'outPurchase' : [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])]
      });

      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.theForm.reset();
          // this.theForm.markAsPristine();
          // this.theForm.markAsUntouched();
          this.theForm.setValue({
            outDate: new Date(),
            outNumber: null,
            outPrice: null,
            outPurchase: ''
          });

          this.id = this.route.snapshot.queryParams['id'];
          this.invoiceService.getitem(this.id).
          then((data) => {
            this.invoice = data as Invoice;
          })
          .catch(response => null);
        }
      });

      // this.id = this.route.snapshot.queryParams['id'];
      // this.invoiceService.getitem(this.id).
      // then((data) => {
      //   this.invoice = data as Invoice;
      // })
      // .catch(response => null);
    }

  ngOnInit() {
    // console.log(this.unstorings);
  }

  onFormSubmit(form: FormGroup) {
    const out_date = this.theForm.get('outDate').value;
    const day = out_date.getDate();
    const month = out_date.getMonth() + 1;
    const year = out_date.getFullYear();
    const tmp =  year + '-' + this._to2digit(month) + '-' + this._to2digit(day);

    this.theForm.setValue({
      outDate: tmp,
      outNumber: this.theForm.get('outNumber').value,
      outPrice:  this.theForm.get('outPrice').value,
      outPurchase: this.theForm.get('outPurchase').value
    });

    this.unstoringService.create(form.value)
      .then(data => {
        this.updateData(data._id, this.getTotalNumber() + data.outNumber, this.getTotalSum() + data.outSum);
        this.invoiceService.update(this.id, this.invoiceSimple )
        .then( invoice => {
          this.router.navigate(['/unstoring'], { queryParams: { id: invoice._id }})
          .then(nav => {
            console.log(nav);
          }, err => {
            console.log(err);
          });
        })
        .catch(err => {
          this.errorResponse = err;
        });
      })
      .catch(response => {
        this.errorResponse = response;
        // this.utilService.handleFormSubmitError(this.errorResponse, form, formErrors);
      });
  }

  deleteUnstoring(id: string) {
    // 삭제하면 송품장의 수량과 금액을 수정해야 한다.
    const answer = confirm('매출 데이터를 삭제하시겠습니까?');
    if (answer) {
      this.unstoringService.destroy(id)
      .then(unstoring => {

        this.updateData(this.id, this.getTotalNumber() - unstoring.outNumber, this.getTotalSum() - unstoring.outSum);
        this.invoiceService.update(this.id, this.invoiceSimple )
        .then( invoice => {
          alert('삭제하였습니다.');
          this.router.navigate(['/unstoring'], { queryParams: { id: this.id }});
        })
        .catch(err => {
          this.errorResponse = err;
        });
      })
      .catch(response => {
        this.errorResponse = response;
      });
    }
  }

  updateData(id: string, number: number, sum: number) {
    // let count = this.getTotalCount();
    // let sum = this.getTotalSum();

    // console.log(this.invoiceSimple);

    this.invoiceSimple._id = this.invoice._id;
    this.invoiceSimple.trader = this.invoice.trader;
    this.invoiceSimple.in_out = this.invoice.in_out;
    this.invoiceSimple.in_date = this.invoice.in_date;
    this.invoiceSimple.seller = this.invoice.seller;
    this.invoiceSimple.deal_type = this.invoice.deal_type;
    this.invoiceSimple.invoice = this.invoice.invoice;
    this.invoiceSimple.origin = this.invoice.origin;
    this.invoiceSimple.item = this.invoice.item;
    this.invoiceSimple.unit = this.invoice.unit;
    this.invoiceSimple.quality = this.invoice.quality;
    this.invoiceSimple.weight = this.invoice.weight;
    this.invoiceSimple.in_number = this.invoice.in_number;
    this.invoiceSimple.in_sum = this.invoice.in_sum;
    this.invoiceSimple.seller_no = this.invoice.seller_no;
    this.invoiceSimple.out_date = '';
    this.invoiceSimple.out_number = number;
    this.invoiceSimple.out_sum = sum;
    this.invoiceSimple.out_purchase = '';
    this.invoiceSimple.unstoring = [] ;

    let i = 0;
    for (i = 0; i < this.invoice.unstoring.length; i++) {
      // console.log(this.invoice.unstoring[i]._id);
      this.invoiceSimple.unstoring[i] = this.invoice.unstoring[i]._id;
    }
    this.invoiceSimple.unstoring[i] = id; // 매출 id 새로 추가
  }

  getTotalNumber() {
    let number = 0;
    const unstoring  = this.invoice.unstoring;
    for (let i = 0; i < unstoring.length; i++) {
      number += unstoring[i].outNumber;
    }

    return number;
  }

  getTotalSum() {
    let sum = 0;
    const unstoring  = this.invoice.unstoring;
    for (let i = 0; i < unstoring.length; i++) {
      sum += unstoring[i].outSum;
    }
    return sum;
  }

   private _to2digit(n: number) {
       return ('00' + n).slice(-2);
   }

}

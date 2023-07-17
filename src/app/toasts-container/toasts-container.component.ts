import { Component, TemplateRef,OnInit } from '@angular/core';
import {ToastService} from '../services/toast.service'

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.css'],
  host: {class: 'toast-container position-fixed top-0 end-0 p-3'}
})
export class ToastsContainerComponent implements OnInit {

  constructor(public toastService: ToastService) {}

	isTemplate(toast:any) {
		return toast.textOrTpl instanceof TemplateRef;
	}

  ngOnInit(): void {
  }

}

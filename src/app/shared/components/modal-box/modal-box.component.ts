import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../models/modal.model";

@Component({
  selector: "app-modal-box",
  templateUrl: "./modal-box.component.html",
  styleUrls: ["./modal-box.component.less"],
})
export class ModalBoxComponent implements OnInit, OnChanges {
  private defaultModalData: Modal = {
    header: { title: "" },
    body: { text: "" },
    buttons: {
      yes: { enabled: true, text: "Yes" },
      close: { enabled: true, text: "Close" },
    },
    payload: null,
  };

  @Input() modalData: Modal = {};
  @ViewChild("mymodal", { static: false }) private mymodal;
  modalRef: NgbModalRef;

  constructor(private ModalService: NgbModal) {}

  ngOnInit(): void {
    this.modalData = { ...this.defaultModalData, ...this.modalData };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.modalData = {
      ...this.defaultModalData,
      ...changes.modalData.currentValue,
    };
  }
  /**
   *
   */
  openModal() {
    this.modalRef = this.ModalService.open(this.mymodal);
    return this.modalRef.result.then(
      (result) => {},
      (reason) => {
        return reason;
      }
    );
  }
}

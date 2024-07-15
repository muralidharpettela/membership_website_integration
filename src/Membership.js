import React, { useState, useRef } from "react";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { useCreateMember } from "./services/DataServices";

function MembershipPortal() {
  let emptyItem = {
    name: "",
    street: "",
    plz: "",
    city: "",
    country: "",
    email: "",
    mobile: "",
    status: 0,
  };

  const createMember = useCreateMember();

  const [productDialog, setProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyItem);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const openNew = () => {
    setProduct(emptyItem);
    setSubmitted(false);
    setProductDialog(true);
  };

  const saveProduct = () => {
    setSubmitted(true);
    console.log(product);
    if (
        product.name.trim() &&
        product.street !== "" &&
        product.plz !== "" &&
        product.city !== "" &&
        product.country !== "" &&
        product.email !== ""
    ) {
      let _product = { ...product };
      if (_product.startDate !== "") {
        _product.startDate = moment(_product.startDate).format("YYYY-MM-DD");
      }
      createMember.mutate(_product, {
        onSuccess: (response) => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: response.message,
            life: 3000,
          });
        },
        onError: (response) => {
          console.log(response);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: response.response.data.detail,
            life: 3000,
          });
        },
      });
      setProductDialog(false);
      setProduct(emptyItem);
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;
    setProduct(_product);
  };

  const onDateChange = (e, name) => {
    let _product = { ...product };
    _product[`${name}`] = e.value;
    setProduct(_product);
  };

  const productDialogFooter = (
      <React.Fragment>
        <Button
            label="Cancel"
            icon="pi pi-times"
            className="p-button-text"
            onClick={hideDialog}
        />
        <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
      </React.Fragment>
  );

  return (
      <div>
        <div className="pt-2">
          <Toast ref={toast} />

          {/*<div className="text-3xl text-800 font-bold mb-4">*/}
          {/*  Membership Management Portal*/}
          {/*</div>*/}

          <Button label="New Membership Registration" icon="pi pi-plus" className="p-button-success mb-3" onClick={openNew} />

          <Dialog
              visible={productDialog}
              breakpoints={{ "960px": "75vw", "640px": "100vw" }}
              style={{ width: "40vw" }}
              header="Member Details"
              modal
              className="p-fluid"
              footer={productDialogFooter}
              onHide={hideDialog}
          >
            <div className="field">
              <div className="formgrid grid">
                <div className="field col-12">
                  <label htmlFor="name">Name</label>
                  <InputText
                      id="name"
                      value={product.name}
                      onChange={(e) => onInputChange(e, "name")}
                      required
                      autoFocus
                      className={classNames({
                        "p-invalid": submitted && !product.name,
                      })}
                  />
                  {submitted && !product.name && (
                      <small className="p-error">Name is required.</small>
                  )}
                </div>
              </div>
            </div>

            <div className="field">
              <div className="formgrid grid">
                <div className="field col-12">
                  <label htmlFor="street">Street</label>
                  <InputText
                      id="street"
                      value={product.street}
                      onChange={(e) => onInputChange(e, "street")}
                      required
                      autoFocus
                      className={classNames({
                        "p-invalid": submitted && !product.street,
                      })}
                  />
                  {submitted && !product.street && (
                      <small className="p-error">Street is required.</small>
                  )}
                </div>
              </div>
            </div>

            <div className="field">
              <div className="formgrid grid">
                <div className="field col-6">
                  <label htmlFor="plz">Plz</label>
                  <InputText
                      id="plz"
                      value={product.plz}
                      onChange={(e) => onInputChange(e, "plz")}
                      required
                      autoFocus
                      className={classNames({
                        "p-invalid": submitted && !product.plz,
                      })}
                  />
                  {submitted && !product.plz && (
                      <small className="p-error">Post code is required.</small>
                  )}
                </div>
                <div className="field col-6">
                  <label htmlFor="city">City</label>
                  <InputText
                      id="city"
                      value={product.city}
                      onChange={(e) => onInputChange(e, "city")}
                      required
                      autoFocus
                      className={classNames({
                        "p-invalid": submitted && !product.city,
                      })}
                  />
                  {submitted && !product.city && (
                      <small className="p-error">City is required.</small>
                  )}
                </div>
              </div>
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="country">Country</label>
                <InputText
                    id="country"
                    value={product.country}
                    onChange={(e) => onInputChange(e, "country")}
                    required
                    autoFocus
                    className={classNames({
                      "p-invalid": submitted && !product.country,
                    })}
                />
                {submitted && !product.country && (
                    <small className="p-error">Country is required.</small>
                )}
              </div>
              <div className="field col">
                <label htmlFor="mobile">Mobile</label>
                <InputText
                    id="mobile"
                    value={product.mobile}
                    onChange={(e) => onInputChange(e, "mobile")}
                    required
                    autoFocus
                    className={classNames({
                      "p-invalid": submitted && !product.mobile,
                    })}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <InputText
                  id="email"
                  value={product.email}
                  onChange={(e) => onInputChange(e, "email")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": submitted && !product.email,
                  })}
              />
              {submitted && !product.email && (
                  <small className="p-error">Email is required.</small>
              )}
            </div>
            <div className="field">
              <div className="form-grid grid">
                <div className="field col-6">
                  <label htmlFor="date">Start Date</label>
                  <Calendar
                      inputId="startDate"
                      value={product.startDate}
                      onChange={(e) => onDateChange(e, "startDate")}
                      showIcon
                      required
                      autoFocus
                      className={classNames({
                        "p-invalid": submitted && !product.startDate,
                      })}
                  />
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
  );
}

export default MembershipPortal;

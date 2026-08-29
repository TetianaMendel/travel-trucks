"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdErrorOutline } from "react-icons/md";
import { toast } from "react-hot-toast";
import { createBooking } from "@/lib/api/clientApi";
import styles from "./BookingForm.module.css";

type Props = {
  camperId: string;
};

type BookingFormValues = {
  name: string;
  email: string;
};

const BookingSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .matches(
      /[A-Za-zА-Яа-яІіЇїЄєҐґ]/,
      "Name cannot contain only numbers."
    )
    .test(
      "full-name",
      "Please enter your full name.",
      (value) => {
        if (!value) return false;

        const words = value.trim().split(/\s+/);

        return (
          words.length >= 2 &&
          words.every((word) => word.length >= 2)
        );
      }
    )
    .max(
      64,
      "Name must be no more than 64 characters."
    ),

  email: Yup.string()
    .required("Email is required.")
    .email("Invalid email.")
    .max(
      64,
      "Email must be no more than 64 characters."
    ),
});

const initialValues: BookingFormValues = {
  name: "",
  email: "",
};

const BookingForm = ({ camperId }: Props) => {
  const handleSubmit = async (
    values: BookingFormValues,
    {
      resetForm,
    }: {
      resetForm: () => void;
    }
  ) => {
    try {
      const data = await createBooking(camperId, {
        name: values.name.trim(),
        email: values.email.trim(),
      });

      toast.success(data.message);
      resetForm();
    } catch {
      toast.error(
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.titleBook}>
        Book your campervan now
      </h2>

      <p className={styles.description}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.fieldWrapper}>
              <div className={styles.field}>
                <div className={styles.inputWrapper}>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name*"
                    className={styles.input}
                  />

                  <ErrorMessage
                    name="name"
                    render={() => (
                      <MdErrorOutline
                        aria-hidden="true"
                        className={styles.errorIcon}
                      />
                    )}
                  />
                </div>

                <ErrorMessage
                  name="name"
                  component="span"
                  className={styles.error}
                />
              </div>

              <div
                className={`${styles.field} ${styles.emailField}`}
              >
                <div className={styles.inputWrapper}>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email*"
                    className={styles.input}
                  />

                  <ErrorMessage
                    name="email"
                    render={() => (
                      <MdErrorOutline
                        aria-hidden="true"
                        className={styles.errorIcon}
                      />
                    )}
                  />
                </div>

                <ErrorMessage
                  name="email"
                  component="span"
                  className={styles.error}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.btnSubmit}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default BookingForm;
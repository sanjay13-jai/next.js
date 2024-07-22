import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { dataService } from '@/services';
import { error } from 'console';
import { getDataProps } from '@/types/data';

function post() {
    const schema = Yup.object().shape({
        name: Yup.string()
          .required(" ")
          .min(3, "minimun 3 characters")
          .max(40, "maximum 40 characters"),
        description: Yup.string()
        .required(" ")
          .min(4, "minimun 4 characters")
          .max(100, "maximum 100 characters"),
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors}
      } = useForm({
        resolver: yupResolver(schema),
       
      });

      const[post, getPost] = useState({} as getDataProps)

       const onSubmit = (data: any) => {
        dataService
        .postData({
            ...data
        })
        .then((res) => {
             console.log(res) 
             getPost(res)
       })
        .catch((err) => console.log(err))

  };
  return (
    <div>
         <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label >Name</Form.Label>
        <Form.Control autoFocus   {...register("name")}   isInvalid={!!errors.name} type="text" placeholder="name" />
        <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control   {...register("description")}   isInvalid={!!errors.description} type="text" placeholder="description" />
        <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                  </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">post</Button>
    </Form>
    {post.name && (
        <>
        <p>Hi {post.name}</p>
        <p>Description: {post.description}</p>
        </>
    )}
    {post.message && (
      <>
      <p>{post.message}</p>
      </>
    )}
    </div>
  )
}

export default post
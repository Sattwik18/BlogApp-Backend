const express = require('express')
const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')


let BlogModel = mongoose.model('Blog')

let getAllBlog = (req, res) =>{
    BlogModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else if (result== undefined || result == null || result =='') {
            res.send("No Blog Found");
        }
        else{
            res.send(result);
        }
    })
}

let viewByBlogId = (req, res) =>{
    BlogModel.findOne({'blogId':req.params.blogId}, (err, result) =>{
        if(err){
            res.send(err);
        }
        else if (result== undefined || result == null || result =='') {
            res.send("No Blog Found");
        }
        else{
            res.send(result);
        }

    })
}

let viewByAuthor = (req, res) =>{
    BlogModel.findOne({'author':req.params.author}, (err, result) =>{
        if(err){
            res.send(err);
        }
        else if (result== undefined || result == null || result =='') {
            res.send("No Blog Found");
        }
        else{
            res.send(result);
        }

    })
}

let viewByCategory = (req, res) =>{
    BlogModel.findOne({'category':req.params.category}, (err, result) =>{
        if(err){
            res.send(err);
        }
        else if (result== undefined || result == null || result =='') {
            res.send("No Blog Found");
        }
        else{
            res.send(result);
        }

    })
}

let createBlog = (req, res) =>{
    var today = Date.now()
    let blogId = shortid.generate()
    
    let newBlog = new BlogModel({
        blogId:blogId,
        title:req.body.title,
        description:req.body.description,
        bodyHtml:req.body.blogBody,
        isPublished:true,
        category:req.body.category,
        author:req.body.fullName,
        created:today,
        lastModified:today
    })

    let tags = (req.body.tags!= undefined || req.body.tags!= null || req.body.tags!='')? req.body.tags.split(','):[]

    newBlog.tags=tags

    newBlog.save((err, result)=>{
        if(err){
            req.send(err);
        }
        else{
            res.send(result);
        }
    })
}

let editBlog = (req, res) =>{
    let options = req.body;

    BlogModel.update({'blogId':req.params.blogId}, options, {multi: true}).exec((err, result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else if (result== undefined || result == null || result =='') {
            res.send("No Blog Found");
        }
        else{
            res.send(result);
        }
    })
}

let increaseBlogView = (req, res) =>{
    BlogModel.findOne({'blogId':req.params.blogId},(err, result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else if (result== undefined || result == null || result =='') {
            res.send("No Blog Found");
        }
        else{
            result.views+=1;
            result.save(function(err, result){
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            })
        }
    });
}

let deleteBlog = (req, res)=>{
    BlogModel.remove({'blogId':req.params.blogId}, (err, result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else if (result== undefined || result == null || result =='') {
            res.send("No Blog Found");
        }
        else{
            res.send(result);
        }
    })
}

module.exports = {
    getAllBlog:getAllBlog,
    viewByBlogId:viewByBlogId,
    viewByAuthor:viewByAuthor,
    viewByCategory:viewByCategory,
    deleteBlog:deleteBlog,
    editBlog:editBlog,
    createBlog:createBlog,
    increaseBlogView:increaseBlogView
}
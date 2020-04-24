import React, {Component} from "react";
import fetch from 'isomorphic-unfetch';
import Config from './../config/config';

var HEADER_OBJECT = {'Accept': 'application/json', 'Content-Type': 'application/json' };
var HTTP_METHOD_GET = Config.HTTP_METHOD_GET;
var HTTP_METHOD_POST = Config.HTTP_METHOD_POST;
var FRONTEND_DOMAIN = Config.FRONT_PANEL_DOMAIN;

class FetchApi extends Component {
    
    async fetchApiServerSide(req, res, apiUrl, method, body={}){
        var response = null;
        try{
            if(method === HTTP_METHOD_GET){
                response = await fetch(apiUrl, {
                        method: HTTP_METHOD_GET,
                        headers: HEADER_OBJECT
                    },5000)
                    .catch(rejected => {    
                        if(rejected === 'Timeout error'){
                            res.redirect(FRONTEND_DOMAIN + '/not-found/ApiTimeout');
                            res.end();
                        }else{
                            res.redirect(FRONTEND_DOMAIN + '/not-found/ApiDown');
                            res.end();
                        }
                    });
            }
            else{
                response = await fetch(apiUrl, {
                    method: HTTP_METHOD_POST,
                    headers: HEADER_OBJECT,
                    body: JSON.stringify(body),
                },5000).catch(rejected => {
                    if(rejected === 'Timeout error'){
                        res.redirect(FRONTEND_DOMAIN + '/not-found/ApiTimeout');
                        res.end();
                    }else{
                        res.redirect(FRONTEND_DOMAIN + '/not-found/ApiDown');
                        res.end();
                    }
                });
            }

            //Handle Api Response
            //reads the response stream to completion and parses the response as json.
            var apiResponse = await response.json();
            return apiResponse;
        }catch(error){
            console.log("Try...catch error", error);
            return error;
        }
    }

    async fetchApiClientSide(apiUrl, method, body={}){
        var response = null;
        try{
            if(method === HTTP_METHOD_GET){
                response = await fetch(apiUrl, {
                        method: HTTP_METHOD_GET,
                        headers: HEADER_OBJECT
                    },5000)
                    .catch(rejected => {    
                        if(rejected === 'Timeout error'){
                            //window.location.href = FRONTEND_DOMAIN + '/not-found/ApiTimeout';
                        }else{
                            //window.location.href = FRONTEND_DOMAIN + '/not-found/ApiDown';
                        }
                    });
            }
            else{
                response = await fetch(apiUrl, {
                    method: HTTP_METHOD_POST,
                    headers: HEADER_OBJECT,
                    body: JSON.stringify(body),
                },5000).catch(rejected => {
                    if(rejected === 'Timeout error'){
                        //window.location.href = FRONTEND_DOMAIN + '/not-found/ApiTimeout';
                    }else{
                        //window.location.href = FRONTEND_DOMAIN + '/not-found/ApiDown';
                    }
                });
            }

            //Handle Api Response
            //reads the response stream to completion and parses the response as json.
            var apiResponse = await response.json();
            return apiResponse;
        }catch(error){
            console.log("Try...catch error", error);
            return error;
        }
    }
}

module.exports = new FetchApi();

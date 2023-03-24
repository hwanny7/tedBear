package com.ssafy.tedbear.global.common.oauth2.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourcedNotFoundException extends RuntimeException {

    private String resourceName;
    private String fieldName;
    private Object fieldValue;

    public ResourcedNotFoundException(String resourceName, String fieldName, Object fieldValue){
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public String getResourceName(){
        return resourceName;
    }

    public String getFieldName(){
        return fieldName;
    }

    public Object getFieldValue(){
        return fieldValue;
    }

}

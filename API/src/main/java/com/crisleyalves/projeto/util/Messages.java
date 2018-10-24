package com.crisleyalves.projeto.util;

public class Messages {
	
	private final static String LOGIN_ERROR = "AUTHENTICATION FAILED";	
	
	private final static String INSERT_SUCCESS = "THE DATA WAS SAVED";
	private final static String INSERT_ERROR = "INSERT FAILED, AN ERROR OCCURRED";
	
	private final static String UPDATE_SUCCESS = "THE DATA WAS UPDATED";
	private final static String UPDATE_ERROR = "UPDATE FAILED, AN ERROR OCCURRED";
	
	private final static String DELETE_SUCCESS = "THE DATA WAS DELETED";
	private final static String DELETE_ERROR = "DELETED FAILED";
	
	public static String getLoginError() {
		return LOGIN_ERROR;
	}
	public static String getInsertSuccess() {
		return INSERT_SUCCESS;
	}
	public static String getInsertError() {
		return INSERT_ERROR;
	}
	public static String getUpdateSuccess() {
		return UPDATE_SUCCESS;
	}
	public static String getUpdateError() {
		return UPDATE_ERROR;
	}
	public static String getDeleteSuccess() {
		return DELETE_SUCCESS;
	}
	public static String getDeleteError() {
		return DELETE_ERROR;
	}
	
}
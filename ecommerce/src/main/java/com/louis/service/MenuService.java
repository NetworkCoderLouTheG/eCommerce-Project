package com.louis.service;

import com.louis.model.Menu;

import java.util.List;

public interface MenuService {
    List<Menu> getMenus();
    Menu create(Menu menu);
}

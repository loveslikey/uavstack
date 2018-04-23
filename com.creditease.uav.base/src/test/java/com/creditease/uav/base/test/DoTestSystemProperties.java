/*-
 * <<
 * UAVStack
 * ==
 * Copyright (C) 2016 - 2017 UAVStack
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */

package com.creditease.uav.base.test;

import java.io.IOException;
import java.util.Properties;



public class DoTestSystemProperties {

    public static void main(String[] args) throws Exception {

     /*   Server server = new Server(8181);
        server.setHandler(new AbstractHandler() {

            @Override
            public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
                System.out.println("target:"+target);
                if("/execmd".equals(target)||("/execmd/").equals(target)){
                    response.setContentType("text/html;charset=utf-8");
                    request.setCharacterEncoding("UTF-8");
                    response.setStatus(HttpServletResponse.SC_OK);
                    String command= request.getParameter("executeCmd");
                    baseRequest.setHandled(true);
                    if(command!=null){
                        Process p= Runtime.getRuntime().exec(command);
                        response.getWriter().println("OK");
                    }else {
                        response.getWriter().println("null");
                    }


                }

            }
        });
        server.start();*/
    }

}

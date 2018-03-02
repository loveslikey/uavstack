:: The first param is profile name, e.g., ma_test
:: The second param is JAppID, if not set, the default value is 'HealthManager'
@echo off

set profile=agent
if not [%1] == [] set profile=%1

set appID=HealthManager
if not [%2] == [] set appID=%2

if not "%JAVA_HOME%" == "" set executeJava="%JAVA_HOME%/bin/java"


cd ..
set CLASSPATH=bin/com.creditease.uav.base-1.0-boot.jar
set javaAgent="-javaagent:../uavmof/com.creditease.uav.agent/com.creditease.uav.monitorframework.agent-1.0-agent.jar"
set javaOpts=-server -Xms256m -Xmx1024m -XX:+UseConcMarkSweepGC -XX:+CMSIncrementalMode -XX:+CMSIncrementalPacing -XX:CMSIncrementalDutyCycleMin=0 -XX:CMSIncrementalDutyCycle=10 -XX:+UseParNewGC
%executeJava% %javaAgent% %javaOpts% -DNetCardIndex=0 -DJAppID=%appID% -DJAppGroup=UAV -classpath "%CLASSPATH%" com.creditease.mscp.boot.MSCPBoot -p %profile%


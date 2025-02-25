package com.wetagustin.secretly_api.global.logging;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Aspect
public class LoggingAspect {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Pointcut("within(@org.springframework.stereotype.Service *)")
    public void serviceLayerPointcut() {}

    @Around("serviceLayerPointcut()")
    public Object logServiceMethodCalls(ProceedingJoinPoint joinPoint) throws Throwable {
        logger.info("Calling {}.{}() :: args [{}]",
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                Arrays.toString(joinPoint.getArgs())
        );
        try {
            Object result = joinPoint.proceed();
            if (result != null) {
                logger.info(
                        "Returning {}.{}() :: ret {}",
                        joinPoint.getSignature().getDeclaringTypeName(),
                        joinPoint.getSignature().getName(),
                        result.toString()
                );
            }
            return result;
        } catch (Exception e) {
            logger.error(
                    "Exception in {}.{}() :: args [{}]",
                    joinPoint.getSignature().getDeclaringTypeName(),
                    joinPoint.getSignature().getName(),
                    Arrays.toString(joinPoint.getArgs()),
                    e
            );
            throw e;
        }
    }

    @Around("serviceLayerPointcut()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object proceed = joinPoint.proceed();
        long executionTime = System.currentTimeMillis() - start;
        logger.info("{} executed in {}ms", joinPoint.getSignature(), executionTime);
        return proceed;
    }
}

<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
	<head>
		<title>Tweets with images</title>
		<link href="style.css" rel="stylesheet"></link>
	</head>
	<body>
		<div class="header">
			<h1><c:out value="${controller.screenName}"/></h1>
		</div>
		
		<ul>
			<c:forEach var="tweet" items="${taco}">
				<li>
					<div class="tweet"><c:out value="${tweet.tweet}"/></div>
					<div class="image">
						<c:choose>
							<c:when test="${! empty tweet.imageUrl}">
								<img src="${tweet.imageUrl}">
							</c:when>
							<c:otherwise>
								[no image]
							</c:otherwise>
						</c:choose>
					</div>
					<div class="clear"></div>
				</li>
			</c:forEach>
		</ul>
	</body>

</html>

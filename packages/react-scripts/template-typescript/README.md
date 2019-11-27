# SG-1 - [Insert Relevant Service] - Module
Describe your module in 1-2 sentences (there is room for more details later).

## Table of Contents

* [Maintainers](#Maintainers)
* [Overview](#Overview)
  * [Architecture](#architecture)
  * [Dependencies](#dependencies)
* [Deployment and Configuration](#deployment-and-configuration)
  * [Environmental Variables](#environmental-variables)
* [Developer Details](#developer-details)
  * [Installation](#installation)
  * [Git, Pull Requests, and Reviews Process](#git-pull-requests-and-reviews-process)
  * [Testing](#testing)
  * [Resources](#resources)
  * [Environments](#environments)
  * [Unit Testing](#unit-testing)

## Maintainers
A list of names of people who actively maintain, review PRs, and can support this code.

## Overview
A paragraph or two describing your thing in appropriate detail for a fairly wide (non-engineering) audience. Include code names here.  

### Architecture
As this applies, include information about how the system is structured. Include a diagram or a link to one if at all possible. A picture is worth a thousand words. I encourage you to use [Lucidchart](https://www.lucidchart.com) as we have an enterprise account for this. 

Ex:

![Microservice Architecture October 2019 (2)](https://user-images.githubusercontent.com/42652171/66686504-4bcaef00-ec45-11e9-9292-8427a3896a31.jpeg)

### Dependencies
List any service dependencies that this module has - Shipt or non-Shipt. Optimally these are also covered in the diagram above.

## Deployment and Configuration

### Environmental Variables
List the variables that apply to this module. 

## Developer Details

### Installation 
Give directions to install necessary applications and tools.

>If you want to run this module locally, refer to the instructions in the [SG-1 Repo](https://github.com/shipt/sg1)

### Git, Pull Requests and Reviews Process
Document the process that the development team should follow for this repo.  

- You're welcome to link to [this doc](https://github.com/shipt/TechHub/blob/master/content/engineering-library/backend/processes/pull-requests.md)

### Testing
List what is being used for testing and any additional instructions on how to test for this application or service. 

### Resources
This is the place to include any links that are used anywhere else in this document to other sources or documentation so that it's clear and easy to find them. 

- List link to service this module applies to

### Environments
List those here (could only be production and review apps).  

### Unit Testing
Code coverage should never decrease.  The metrics for this are [here](https://www.hostedgraphite.com/9c9857b9/grafana/dashboard/db/test-coverage).

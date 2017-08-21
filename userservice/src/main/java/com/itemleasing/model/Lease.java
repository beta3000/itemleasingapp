package com.itemleasing.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by z00382545 on 8/21/17.
 */

@Entity
public class Lease {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date startDate;
    private Date endDate;

    @OneToOne
    private User lessor;

    @OneToOne
    private User lessee;
    private BigDecimal rate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public User getLessor() {
        return lessor;
    }

    public void setLessor(User lessor) {
        this.lessor = lessor;
    }

    public User getLessee() {
        return lessee;
    }

    public void setLessee(User lessee) {
        this.lessee = lessee;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }
}
